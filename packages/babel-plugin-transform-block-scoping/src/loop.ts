import { template, types as t } from "@babel/core";
import type { NodePath, Visitor, Scope } from "@babel/core";

interface LoopBodyBindingsState {
  blockScoped: Scope.Binding[];
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

export function getUsageInBody(
  binding: Scope.Binding,
  loopPath: NodePath<t.Loop>,
) {
  // UpdateExpressions are counted both as a reference and a mutation,
  // so we need to de-duplicate them.
  const seen = new WeakSet<t.Node>();

  let capturedInClosure = false;
  // Distinct from capturedInClosure: a reference inside a function that is
  // created while evaluating ForStatement.init (the loop head), not the body.
  // wrapLoopBody cannot preserve those — the closure is not in the body —
  // so we only report the flag; we do not rewrite the reference here.
  let capturedInHeadClosure = false;

  const constantViolations = filterMap(binding.constantViolations, path => {
    const { inBody, inHead, inClosure } = relativeLoopLocation(path, loopPath);

    // Same as a head *read*: an assignment inside a head-created closure
    // still means that closure closed over this binding.
    if (inHead && inClosure) capturedInHeadClosure = true;

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

    const { inBody, inHead, inClosure } = relativeLoopLocation(path, loopPath);

    if (inHead && inClosure) {
      capturedInHeadClosure = true;
      // Not a body usage: do not feed this path to wrapLoopBody / param passing.
      return null;
    }
    if (!inBody) return null;
    capturedInClosure ||= inClosure;

    return path as NodePath<t.Identifier>;
  });

  return {
    capturedInClosure,
    capturedInHeadClosure,
    hasConstantViolations: constantViolations.length > 0,
    usages: references.concat(constantViolations),
  };
}

function relativeLoopLocation(path: NodePath, loopPath: NodePath<t.Loop>) {
  const bodyPath = loopPath.get("body");
  // Only ForStatement has an `init` slot that can contain an arbitrary
  // expression (and therefore a closure). for-in/of `left` is just a binding.
  const headPath = loopPath.isForStatement() ? loopPath.get("init") : null;
  let inClosure = false;

  for (let currPath = path; currPath; currPath = currPath.parentPath) {
    if (currPath.isFunction() || currPath.isClass() || currPath.isMethod()) {
      inClosure = true;
    }
    if (currPath === bodyPath) {
      return { inBody: true, inHead: false, inClosure };
    } else if (headPath && currPath === headPath) {
      return { inBody: false, inHead: true, inClosure };
    } else if (currPath === loopPath) {
      // test / update (or anything else in the loop node but not body/init)
      return { inBody: false, inHead: false, inClosure };
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
  loopPath.traverse(
    {
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
            throw new Error(
              "Assertion failure. Please report this bug to Babel.",
            );
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
    },
    state,
  );

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
  const fn = t.functionExpression(null, closureParams, t.blockStatement([]));
  let call: t.Expression = t.callExpression(t.identifier(id), callArgs);

  const fnParent = loopPath.findParent(p => p.isFunctionParent());
  if (fnParent) {
    // @ts-expect-error: async and generator are not on t.FunctionParent, here we provide default values for static blocks.
    const { async = false, generator = false } =
      fnParent.node as t.FunctionParent;
    fn.async = async;
    fn.generator = generator;
    if (generator) call = t.yieldExpression(call, true);
    else if (async) call = t.awaitExpression(call);
  }

  const updaterNode =
    updater.length > 0
      ? t.expressionStatement(t.sequenceExpression(updater))
      : null;

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
    const assign: t.Expression[] = [];
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
        const arg = path.node.argument || t.buildUndefinedNode();
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

  // Assign loop closure body after the original loop body was manipulated by
  // the completion record handling above. Doing so also avoids duplicate AST
  // nodes during the transform
  const loopBlockBody = t.toBlock(loopNode.body);
  loopNode.body = t.blockStatement(bodyStmts);
  fn.body = loopBlockBody;
  if (updaterNode) loopBlockBody.body.push(updaterNode);

  return varPath;
}

/**
 * Wrap an entire loop statement in a per-entry function.
 *
 * wrapLoopBody only moves the *body*. That is enough when a closure in the
 * body captures a head binding (classic `for (let i = 0; ...) { () => i }`).
 * It cannot help when the closure is created in ForStatement.init, because
 * that expression stays on the loop node.
 *
 * Putting the whole `for` inside `_loop()` means each *entry* of the
 * statement (e.g. each outer-loop iteration) gets a fresh function-scoped
 * `var` environment, without inserting snapshot declarators in the head
 * (the #18195 approach, which broke evaluation order).
 *
 * Returns the wrapper `var _loop = function () { ... }` path so the caller
 * can unwrap this/arguments and, if needed, lower the head `let` now that
 * its function parent is `_loop`.
 */
export function wrapLoopStatement(loopPath: NodePath<t.Loop>) {
  // Labels on this statement itself (`inner: for (...)`) are not children
  // of the traverse root, so they never enter labelsStack. Capture them
  // before we maybe wrap the for in a block (which would sit between the
  // for and the LabeledStatement).
  const ownLabels: string[] = [];
  {
    let p = loopPath.parentPath;
    while (p.isLabeledStatement()) {
      ownLabels.push(p.node.label.name);
      p = p.parentPath;
    }
  }

  // Outer `for (var i = 0; i < 2; i++) INNER` stores INNER in a single
  // Statement slot. insertBefore cannot add a sibling there, so the `var
  // _loop` declaration would replace INNER and then vanish when we
  // replaceWith(`_loop()`). Force a block first — same situation wrapLoopBody
  // documents for `if (true) for (...)`.
  if (
    !loopPath.parentPath.isBlockStatement() &&
    !loopPath.parentPath.isProgram() &&
    !loopPath.parentPath.isStaticBlock()
  ) {
    const loopNode = loopPath.node;
    const [blockPath] = loopPath.replaceWith(t.blockStatement([loopNode]));
    loopPath = blockPath.get("body.0") as NodePath<t.Loop>;
  }

  const loopNode = loopPath.node;

  // --- side effects that would cross the new function boundary ---
  // wrapLoopBody copies unlabeled break/continue out of `_loop` because
  // that helper only wraps the *body* — the `for` stays outside, so an
  // unlabeled `break` must return from the function to reach it.
  // wrapLoopStatement wraps the *entire* `for`, so that `for` is inside
  // `_loop`. Unlabeled break/continue therefore still target the same
  // loop (or a nested loop/switch) and must be left alone. Only `return`
  // and labeled jumps whose label is *outside* this statement (e.g.
  // `break outer`) need the completion-value rewrite.
  //
  // `break inner` / `continue inner` still target this `for`; rewrite
  // them to unlabeled so the jump does not try to leave `_loop` to
  // reach a parent LabeledStatement.
  const state: CompletionsAndVarsState = {
    breaksContinues: [],
    returns: [],
    labelsStack: [],
    labellessBreakTargets: 0,
    labellessContinueTargets: 0,
    vars: [],
    loopNode,
  };
  loopPath.traverse(
    {
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
            throw new Error(
              "Assertion failure. Please report this bug to Babel.",
            );
          }
        },
      },
      "BreakStatement|ContinueStatement"(
        path: NodePath<t.BreakStatement | t.ContinueStatement>,
        state,
      ) {
        const { label } = path.node;
        if (!label) return;
        if (state.labelsStack.includes(label.name)) return;
        if (ownLabels.includes(label.name)) {
          path.node.label = null;
          return;
        }
        state.breaksContinues.push(path);
      },
      ReturnStatement(path, state) {
        state.returns.push(path);
      },
      VariableDeclaration(path, state) {
        // Head `let` is not a var yet; skip loop-head bindings either way.
        if (path.parent === state.loopNode && isVarInLoopHead(path)) return;
        if (path.node.kind === "var") state.vars.push(path);
      },
    },
    state,
  );

  const id = loopPath.scope.generateUid("loop");
  const fn = t.functionExpression(null, [], t.blockStatement([]));
  let call: t.Expression = t.callExpression(t.identifier(id), []);

  const fnParent = loopPath.findParent(p => p.isFunctionParent());
  if (fnParent) {
    // Same as wrapLoopBody: if the enclosing function is async/generator,
    // the wrapper must be too so `await`/`yield` in the loop stay valid.
    // @ts-expect-error: async and generator are not on t.FunctionParent
    const { async = false, generator = false } =
      fnParent.node as t.FunctionParent;
    fn.async = async;
    fn.generator = generator;
    if (generator) call = t.yieldExpression(call, true);
    else if (async) call = t.awaitExpression(call);
  }

  // insertBefore may wrap a bare statement body in a BlockStatement
  // (`for (...) STMT` → `for (...) { var _loop; STMT }`).
  const [varPath] = loopPath.insertBefore(
    t.variableDeclaration("var", [t.variableDeclarator(t.identifier(id), fn)]),
  );

  // Hoist `var` so wrapping does not change function-scoped visibility.
  // `var leaked` inside the inner for must still be visible after the loops.
  const varNames: string[] = [];
  for (const varDeclPath of state.vars) {
    const assign: t.Expression[] = [];
    for (const decl of varDeclPath.node.declarations) {
      varNames.push(...Object.keys(t.getBindingIdentifiers(decl.id)));
      if (decl.init) {
        assign.push(
          t.assignmentExpression(
            "=",
            decl.id as Exclude<t.VariableDeclarator["id"], t.VoidPattern>,
            decl.init,
          ),
        );
      }
    }
    if (assign.length > 0) {
      const replacement: t.Node =
        assign.length === 1 ? assign[0] : t.sequenceExpression(assign);
      varDeclPath.replaceWith(replacement);
    } else {
      varDeclPath.remove();
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
  // Statements that replace the original `for` (the call, plus any
  // completion checks). Never emit `call` twice — same rule as wrapLoopBody.
  const callSite: t.Statement[] = [];

  if (labelNum + returnNum === 0) {
    // #18200's repro: empty body, no return/break. Just call `_loop()`.
    callSite.push(t.expressionStatement(call));
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
      callSite.push(
        template.statement.ast`
          if (${call}) ${node}
        `,
      );
    }
  } else {
    const completionId = loopPath.scope.generateUid("ret");
    varPath.pushContainer("declarations", [
      t.variableDeclarator(t.identifier(completionId)),
    ]);
    callSite.push(
      t.expressionStatement(
        t.assignmentExpression("=", t.identifier(completionId), call),
      ),
    );

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

      if (hasInjected) continue;

      callSite.push(
        template.statement.ast`
          if (${t.identifier(completionId)} === ${t.numericLiteral(i)}) ${node}
        `,
      );
    }

    if (returnNum) {
      for (const path of state.returns) {
        const arg = path.node.argument || t.buildUndefinedNode();
        path.replaceWith(
          template.statement.ast`
            return { v: ${arg} };
          `,
        );
      }
      callSite.push(
        template.statement.ast`
          if (${t.identifier(completionId)}) return ${t.identifier(
            completionId,
          )}.v;
        `,
      );
    }
  }

  // Detach the loop from its current parent, then put it inside `_loop`.
  // Rewrite completions first so those paths are still valid.
  const [first, ...rest] = callSite;
  loopPath.replaceWith(first);
  fn.body.body.push(loopNode);
  if (rest.length > 0) {
    varPath.getNextSibling().insertAfter(rest);
  }

  return varPath;
}

export function isVarInLoopHead(path: NodePath<t.VariableDeclaration>) {
  if (t.isForStatement(path.parent)) return path.key === "init";
  if (t.isForXStatement(path.parent)) return path.key === "left";
  return false;
}

export function isVarInForStatementInit(path: NodePath<t.VariableDeclaration>) {
  return path.parentPath.isForStatement() && path.key === "init";
}

function filterMap<T, U extends object>(list: T[], fn: (item: T) => U | null) {
  const result: U[] = [];
  for (const item of list) {
    const mapped = fn(item);
    if (mapped) result.push(mapped);
  }
  return result;
}
