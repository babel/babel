import { template, types as t } from "@babel/core";
import type { NodePath, Visitor, Binding } from "@babel/traverse";

interface LoopBodyBindingsState {
  blockScoped: Binding[];
}

const collectLoopBodyBindingsVisitor: Visitor<LoopBodyBindingsState> = {
  "Expression|Declaration|Loop"(path) {
    path.skip();
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

export function getUsageInBody(binding: Binding, loopPath: NodePath<t.Loop>) {
  // UpdateExpressions are counted both as a reference and a mutation,
  // so we need to de-duplicate them.
  const seen = new WeakSet<t.Node>();

  let capturedInClosure = false;

  const constantViolations = filterMap(binding.constantViolations, path => {
    const { inBody, inClosure } = relativeLoopLocation(path, loopPath);
    if (!inBody) return null;
    capturedInClosure ||= inClosure;

    const id = path.isUpdateExpression()
      ? path.get("argument")
      : path.isAssignmentExpression()
      ? path.get("left")
      : null;
    if (id) seen.add(id.node);
    return id as NodePath<t.Identifier> | null;
  });

  const references = filterMap(binding.referencePaths, path => {
    if (seen.has(path.node)) return null;

    const { inBody, inClosure } = relativeLoopLocation(path, loopPath);
    if (!inBody) return null;
    capturedInClosure ||= inClosure;

    return path as NodePath<t.Identifier>;
  });

  return {
    capturedInClosure,
    hasConstantViolations: constantViolations.length > 0,
    usages: references.concat(constantViolations),
  };
}

function relativeLoopLocation(path: NodePath, loopPath: NodePath<t.Loop>) {
  const bodyPath = loopPath.get("body");
  let inClosure = false;

  for (let currPath = path; currPath; currPath = currPath.parentPath) {
    if (currPath.isFunction() || currPath.isClass()) inClosure = true;
    if (currPath === bodyPath) {
      return { inBody: true, inClosure };
    } else if (currPath === loopPath) {
      return { inBody: false, inClosure };
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
  ) as [NodePath<t.VariableDeclaration>];

  const bodyStmts: t.Statement[] = [];

  const varNames: string[] = [];
  for (const varPath of state.vars) {
    const assign = [];
    for (const decl of varPath.node.declarations) {
      varNames.push(...Object.keys(t.getBindingIdentifiers(decl.id)));
      if (decl.init) {
        assign.push(t.assignmentExpression("=", decl.id, decl.init));
      }
    }
    if (assign.length > 0) {
      let replacement: t.Node =
        assign.length === 1 ? assign[0] : t.sequenceExpression(assign);
      if (
        !t.isForStatement(varPath.parent, { init: varPath.node }) &&
        !t.isForXStatement(varPath.parent, { left: varPath.node })
      ) {
        replacement = t.expressionStatement(replacement);
      }
      varPath.replaceWith(replacement);
    } else {
      varPath.remove();
    }
  }
  if (varNames.length) {
    bodyStmts.push(
      t.variableDeclaration(
        "var",
        varNames.map(name => t.variableDeclarator(t.identifier(name))),
      ),
    );
  }

  if (state.breaksContinues.length === 0 && state.returns.length === 0) {
    bodyStmts.push(t.expressionStatement(call));
  } else {
    const completionId = loopPath.scope.generateUid("ret");
    bodyStmts.push(
      t.variableDeclaration("var", [
        t.variableDeclarator(t.identifier(completionId), call),
      ]),
    );

    const injected = new Set<string>();
    for (const path of state.breaksContinues) {
      const { node } = path;
      const { type, label } = node;
      let name = type === "BreakStatement" ? "break" : "continue";
      if (label) name += "|" + label.name;
      path.replaceWith(t.returnStatement(t.stringLiteral(name)));
      if (updaterNode) path.insertBefore(t.cloneNode(updaterNode));

      if (injected.has(name)) continue;
      injected.add(name);

      bodyStmts.push(
        template.statement.ast`
        if (
          ${t.identifier(completionId)} === ${t.stringLiteral(name)}
        ) ${node}
      `,
      );
    }
    if (state.returns.length) {
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
        if (typeof ${t.identifier(completionId)} === "object")
          return ${t.identifier(completionId)}.v;
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
