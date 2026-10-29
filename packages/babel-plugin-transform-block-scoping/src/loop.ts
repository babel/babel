import { template, types as t } from "@babel/core";
import type { NodePath, Visitor, Scope } from "@babel/core";

interface LoopBodyBindingsState {
  blockScoped: Scope.Binding[];
}

const collectLoopBodyBindingsVisitor: Visitor<LoopBodyBindingsState> = {
  "Expression|Declaration"(path) {
    path.skip();
  },
  Loop(path, state) {
    path.skip();

    if (!path.isForStatement()) return;
    const init = path.get("init");
    if (!init.isVariableDeclaration() || init.node.kind === "var") return;

    for (const name of Object.keys(init.getBindingIdentifiers())) {
      const binding = path.scope.getOwnBinding(name);
      if (!binding) continue;
      const capturedInHeadClosure = [
        ...binding.referencePaths,
        ...binding.constantViolations,
      ].some(ref => {
        const { inHead, inClosure } = relativeLoopLocation(ref, path);
        return inHead && inClosure;
      });
      if (capturedInHeadClosure) state.blockScoped.push(binding);
    }
  },
  Scope(path, state) {
    if (path.isFunctionParent()) path.skip();

    const { bindings } = path.scope;
    for (const name of Object.keys(bindings)) {
      const binding = bindings[name];
      if (
        binding.kind === "let" ||
        binding.kind === "const" ||
        binding.kind === "hoisted"
      ) {
        state.blockScoped.push(binding);
      }
    }
  },
};

export function getLoopBodyBindings(loopPath: NodePath<t.Loop>) {
  const state: LoopBodyBindingsState = { blockScoped: [] };
  loopPath.traverse(collectLoopBodyBindingsVisitor, state);
  return state.blockScoped;
}

export function getUsageInBody(
  binding: Scope.Binding,
  loopPath: NodePath<t.Loop>,
) {
  // UpdateExpressions are counted both as a reference and a mutation,
  // so we need to de-duplicate them.
  const seen = new WeakSet<t.Node>();

  let capturedInClosure = false;
  // Whether the binding is referenced by a closure created in the loop
  // head (e.g. `for (let i = 0, f = () => i; ...)`). Per spec, such a
  // closure captures the one-time environment used to evaluate the head,
  // which is only copied into the first per-iteration environment after
  // the whole initializer has run.
  let capturedInHeadClosure = false;
  // All the identifiers in the loop head (other than the declaration
  // itself) that refer to the binding.
  const headUsages: NodePath<t.Identifier>[] = [];

  const constantViolations: NodePath<t.Identifier>[] = [];
  for (const path of binding.constantViolations) {
    const { inBody, inHead, inClosure } = relativeLoopLocation(path, loopPath);

    const id = path.isUpdateExpression()
      ? path.get("argument")
      : path.isAssignmentExpression()
        ? path.get("left")
        : null;
    if (id) seen.add(id.node);

    // `id` might be a destructuring pattern, such as `[i] = [1]`
    const ids =
      id?.getBindingIdentifierPaths(true)[binding.identifier.name] ?? [];

    if (inHead) {
      capturedInHeadClosure ||= inClosure;
      headUsages.push(...ids);
      continue;
    }
    if (!inBody) continue;
    capturedInClosure ||= inClosure;

    constantViolations.push(...ids);
  }

  const references = filterMap(binding.referencePaths, path => {
    if (seen.has(path.node)) return null;

    const { inBody, inHead, inClosure } = relativeLoopLocation(path, loopPath);

    if (inHead) {
      capturedInHeadClosure ||= inClosure;
      headUsages.push(path as NodePath<t.Identifier>);
      return null;
    }
    if (!inBody) return null;
    capturedInClosure ||= inClosure;

    return path as NodePath<t.Identifier>;
  });

  return {
    capturedInClosure,
    hasConstantViolations: constantViolations.length > 0,
    usages: references.concat(constantViolations),
    capturedInHeadClosure,
    headUsages,
  };
}

export function moveCapturingTestAndUpdateIntoBody(
  loopPath: NodePath<t.ForStatement>,
) {
  const init = loopPath.get("init");

  if (!init.isVariableDeclaration() || init.node.kind !== "let") return;

  let testCaptures = false;
  let updateCaptures = false;

  for (const name of Object.keys(init.getBindingIdentifiers())) {
    const binding = loopPath.scope.getOwnBinding(name);
    if (!binding?.constantViolations.length) continue;
    for (const ref of [
      ...binding.referencePaths,
      ...binding.constantViolations,
    ]) {
      const { inTest, inUpdate, inClosure } = relativeLoopLocation(
        ref,
        loopPath,
      );
      testCaptures ||= inTest && inClosure;
      updateCaptures ||= inUpdate && inClosure;
    }
  }
  if (!testCaptures && !updateCaptures) return;

  makeAnnexBAssignmentsExplicit(loopPath);

  const { node } = loopPath;
  const bodyStmts: t.Statement[] = [];

  if (updateCaptures && node.update) {
    const first = loopPath.scope.generateUid("first");
    init.node.declarations.push(
      t.variableDeclarator(t.identifier(first), t.booleanLiteral(true)),
    );
    bodyStmts.push(
      t.ifStatement(
        t.unaryExpression("!", t.identifier(first)),
        t.expressionStatement(node.update),
      ),
    );
    node.update = t.assignmentExpression(
      "=",
      t.identifier(first),
      t.booleanLiteral(false),
    );
  }

  // The update must run before the test, so if the update has been moved the
  // test needs to be moved too.
  if (node.test) {
    bodyStmts.push(
      t.ifStatement(t.unaryExpression("!", node.test), t.breakStatement()),
    );
    node.test = null;
  }

  if (!t.isEmptyStatement(node.body)) bodyStmts.push(node.body);
  node.body = t.blockStatement(bodyStmts);

  loopPath.scope.crawl();
}

function makeAnnexBAssignmentsExplicit(loopPath: NodePath<t.ForStatement>) {
  const declarations: NodePath<t.FunctionDeclaration>[] = [];
  loopPath.get("body").traverse({
    Function(path) {
      if (
        path.isFunctionDeclaration() &&
        (path.parentPath.isBlockStatement() ||
          path.parentPath.isSwitchCase()) &&
        path.node.id &&
        !path.node.generator &&
        !path.node.async &&
        !path.isInStrictMode() &&
        !hasLexicalConflict(loopPath, path.node.id.name)
      ) {
        declarations.push(path);
      }
      path.skip();
    },
  });

  if (declarations.length === 0) return;

  const names = new Set<string>();
  const renamed = new Map<Scope, Set<string>>();
  for (const path of declarations) {
    const name = path.node.id.name;
    names.add(name);

    // The scope of the enclosing block or `switch`
    const declScope = path.scope.parent;
    if (!renamed.has(declScope)) renamed.set(declScope, new Set());
    if (!renamed.get(declScope).has(name)) {
      renamed.get(declScope).add(name);
      declScope.rename(name);
    }
    path.insertAfter(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.identifier(name),
          t.cloneNode(path.node.id),
        ),
      ),
    );
  }

  const body = t.toBlock(loopPath.node.body);
  body.body.unshift(
    t.variableDeclaration(
      "var",
      Array.from(names, name => t.variableDeclarator(t.identifier(name))),
    ),
  );
  loopPath.node.body = body;
}

function hasLexicalConflict(loopPath: NodePath, name: string) {
  const binding = loopPath.scope.getBinding(name);
  return !!binding && binding.kind !== "var" && binding.kind !== "hoisted";
}

function relativeLoopLocation(path: NodePath, loopPath: NodePath<t.Loop>) {
  const bodyPath = loopPath.get("body");
  const headPath = loopPath.isForStatement() ? loopPath.get("init") : null;
  const testPath = loopPath.isForStatement() ? loopPath.get("test") : null;
  const updatePath = loopPath.isForStatement() ? loopPath.get("update") : null;
  let inClosure = false;

  for (let currPath = path; currPath; currPath = currPath.parentPath) {
    if (currPath.isFunction() || currPath.isClass() || currPath.isMethod()) {
      inClosure = true;
    }
    const location = {
      inBody: false,
      inHead: false,
      inTest: false,
      inUpdate: false,
      inClosure,
    };
    if (currPath === bodyPath) {
      return { ...location, inBody: true };
    } else if (headPath && currPath === headPath) {
      return { ...location, inHead: true };
    } else if (testPath?.node && currPath === testPath) {
      return { ...location, inTest: true };
    } else if (updatePath?.node && currPath === updatePath) {
      return { ...location, inUpdate: true };
    } else if (currPath === loopPath) {
      return location;
    }
  }

  throw new Error(
    "Internal Babel error: path is not in loop. Please report this as a bug.",
  );
}

interface CompletionsAndVarsState {
  breaksContinues: NodePath<t.BreakStatement | t.ContinueStatement>[];
  returns: NodePath<t.ReturnStatement>[];
  labelsStack: string[];
  labellessContinueTargets: number;
  labellessBreakTargets: number;

  vars: NodePath<t.VariableDeclaration>[];
  loopNode: t.Loop;
}

const collectCompletionsAndVarsVisitor: Visitor<CompletionsAndVarsState> = {
  Function(path) {
    path.skip();
  },
  LabeledStatement: {
    enter({ node }, state) {
      state.labelsStack.push(node.label.name);
    },
    exit({ node }, state) {
      const popped = state.labelsStack.pop();
      if (popped !== node.label.name) {
        throw new Error("Assertion failure. Please report this bug to Babel.");
      }
    },
  },
  Loop: {
    enter(_, state) {
      state.labellessContinueTargets++;
      state.labellessBreakTargets++;
    },
    exit(_, state) {
      state.labellessContinueTargets--;
      state.labellessBreakTargets--;
    },
  },
  SwitchStatement: {
    enter(_, state) {
      state.labellessBreakTargets++;
    },
    exit(_, state) {
      state.labellessBreakTargets--;
    },
  },
  "BreakStatement|ContinueStatement"(
    path: NodePath<t.BreakStatement | t.ContinueStatement>,
    state,
  ) {
    const { label } = path.node;
    if (label) {
      if (state.labelsStack.includes(label.name)) return;
    } else if (
      path.isBreakStatement()
        ? state.labellessBreakTargets > 0
        : state.labellessContinueTargets > 0
    ) {
      return;
    }
    state.breaksContinues.push(path);
  },
  ReturnStatement(path, state) {
    state.returns.push(path);
  },
  VariableDeclaration(path, state) {
    if (path.parent === state.loopNode && isVarInLoopHead(path)) return;
    if (path.node.kind === "var") state.vars.push(path);
  },
};

export function wrapLoopBody(
  loopPath: NodePath<t.Loop>,
  captured: string[],
  updatedBindingsUsages: Map<string, NodePath<t.Identifier>[]>,
) {
  const loopNode = loopPath.node;
  const state: CompletionsAndVarsState = {
    breaksContinues: [],
    returns: [],
    labelsStack: [],
    labellessBreakTargets: 0,
    labellessContinueTargets: 0,
    vars: [],
    loopNode,
  };
  loopPath.traverse(collectCompletionsAndVarsVisitor, state);

  const callArgs = [];
  const closureParams = [];
  const updater = [];
  for (const [name, updatedUsage] of updatedBindingsUsages) {
    callArgs.push(t.identifier(name));

    const innerName = loopPath.scope.generateUid(name);
    closureParams.push(t.identifier(innerName));
    updater.push(
      t.assignmentExpression("=", t.identifier(name), t.identifier(innerName)),
    );
    for (const path of updatedUsage) path.replaceWith(t.identifier(innerName));
  }
  for (const name of captured) {
    if (updatedBindingsUsages.has(name)) continue; // already injected
    callArgs.push(t.identifier(name));
    closureParams.push(t.identifier(name));
  }

  const id = loopPath.scope.generateUid("loop");
  const fn = t.functionExpression(
    null,
    closureParams,
    t.toBlock(loopNode.body),
  );
  let call: t.Expression = t.callExpression(t.identifier(id), callArgs);

  const fnParent = loopPath.findParent(p => p.isFunction());
  if (fnParent) {
    const { async, generator } = fnParent.node as t.Function;
    fn.async = async;
    fn.generator = generator;
    if (generator) call = t.yieldExpression(call, true);
    else if (async) call = t.awaitExpression(call);
  }

  const updaterNode =
    updater.length > 0
      ? t.expressionStatement(t.sequenceExpression(updater))
      : null;
  if (updaterNode) fn.body.body.push(updaterNode);

  // NOTE: Calling .insertBefore on the loop path might cause the
  // loop to be moved in the AST. For example, in
  //   if (true) for (let x of y) ...
  // .insertBefore will replace the loop with a block:
  //   if (true) { var _loop = ...; for (let x of y) ... }
  // All subsequent operations in this function on the loop node
  // must not assume that loopPath still represents the loop.
  // TODO: Consider using a function declaration
  const [varPath] = loopPath.insertBefore(
    t.variableDeclaration("var", [t.variableDeclarator(t.identifier(id), fn)]),
  );

  const bodyStmts: t.Statement[] = [];

  const varNames: string[] = [];
  for (const varPath of state.vars) {
    const assign = [];
    for (const decl of varPath.node.declarations) {
      varNames.push(...Object.keys(t.getBindingIdentifiers(decl.id)));
      if (decl.init) {
        assign.push(
          t.assignmentExpression(
            "=",
            // using/await using should be handled by the explicit-resource-management plugin
            // so decl.id must not be a void pattern
            decl.id as Exclude<t.VariableDeclarator["id"], t.VoidPattern>,
            decl.init,
          ),
        );
      } else if (t.isForXStatement(varPath.parent, { left: varPath.node })) {
        assign.push(decl.id as t.Identifier);
      }
    }
    if (assign.length > 0) {
      const replacement: t.Node =
        assign.length === 1 ? assign[0] : t.sequenceExpression(assign);
      varPath.replaceWith(replacement);
    } else {
      varPath.remove();
    }
  }
  if (varNames.length) {
    varPath.pushContainer(
      "declarations",
      varNames.map(name => t.variableDeclarator(t.identifier(name))),
    );
  }

  const labelNum = state.breaksContinues.length;
  const returnNum = state.returns.length;
  if (labelNum + returnNum === 0) {
    bodyStmts.push(t.expressionStatement(call));
  } else if (labelNum === 1 && returnNum === 0) {
    for (const path of state.breaksContinues) {
      const { node } = path;
      const { type, label } = node;
      let name = type === "BreakStatement" ? "break" : "continue";
      if (label) name += " " + label.name;
      path.replaceWith(
        t.addComment(
          t.returnStatement(t.numericLiteral(1)),
          "trailing",
          " " + name,
          true,
        ),
      );
      if (updaterNode) path.insertBefore(t.cloneNode(updaterNode));

      bodyStmts.push(
        template.statement.ast`
        if (${call}) ${node}
      `,
      );
    }
  } else {
    const completionId = loopPath.scope.generateUid("ret");

    if (varPath.isVariableDeclaration()) {
      varPath.pushContainer("declarations", [
        t.variableDeclarator(t.identifier(completionId)),
      ]);
      bodyStmts.push(
        t.expressionStatement(
          t.assignmentExpression("=", t.identifier(completionId), call),
        ),
      );
    } else {
      bodyStmts.push(
        t.variableDeclaration("var", [
          t.variableDeclarator(t.identifier(completionId), call),
        ]),
      );
    }

    const injected: string[] = [];
    for (const path of state.breaksContinues) {
      const { node } = path;
      const { type, label } = node;
      let name = type === "BreakStatement" ? "break" : "continue";
      if (label) name += " " + label.name;

      let i = injected.indexOf(name);
      const hasInjected = i !== -1;
      if (!hasInjected) {
        injected.push(name);
        i = injected.length - 1;
      }

      path.replaceWith(
        t.addComment(
          t.returnStatement(t.numericLiteral(i)),
          "trailing",
          " " + name,
          true,
        ),
      );
      if (updaterNode) path.insertBefore(t.cloneNode(updaterNode));

      if (hasInjected) continue;

      bodyStmts.push(
        template.statement.ast`
        if (${t.identifier(completionId)} === ${t.numericLiteral(i)}) ${node}
      `,
      );
    }

    if (returnNum) {
      for (const path of state.returns) {
        const arg = path.node.argument || path.scope.buildUndefinedNode();
        path.replaceWith(
          template.statement.ast`
          return { v: ${arg} };
        `,
        );
      }

      bodyStmts.push(
        template.statement.ast`
          if (${t.identifier(completionId)}) return ${t.identifier(
            completionId,
          )}.v;
        `,
      );
    }
  }

  loopNode.body = t.blockStatement(bodyStmts);

  return varPath;
}

export function isVarInLoopHead(path: NodePath<t.VariableDeclaration>) {
  if (t.isForStatement(path.parent)) return path.key === "init";
  if (t.isForXStatement(path.parent)) return path.key === "left";
  return false;
}

function filterMap<T, U extends object>(list: T[], fn: (item: T) => U | null) {
  const result: U[] = [];
  for (const item of list) {
    const mapped = fn(item);
    if (mapped) result.push(mapped);
  }
  return result;
}
