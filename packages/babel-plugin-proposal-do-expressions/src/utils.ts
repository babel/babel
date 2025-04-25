import type { NodePath } from "@babel/core";

// Wrap all do expressions in an IIFE.
// This doesn't work with control flow statements like break/continue/return.
// Only use this when the code is too hard to transform.
export function wrapDoExpressionInIIFE(path: NodePath) {
  const state = {
    break: new Set<string | null>(),
    continue: new Set<string | null>(),
    found: false,
  };
  path.traverse({
    DoExpression(path) {
      const body = path.node.body.body;
      if (body.length) {
        path.replaceExpressionWithStatements(body);
      } else {
        path.replaceWith(path.scope.buildUndefinedNode());
      }
    },
    FunctionParent(path) {
      path.skip();
    },
    Loop() {
      state.break.add(null);
      state.continue.add(null);
    },
    LabeledStatement(path) {
      const name = path.node.label.name;
      state.break.add(name);
    },
    BreakStatement(path) {
      if (!state.break.has(path.node.label?.name ?? null)) {
        throwError(path);
      }
    },
    ContinueStatement(path) {
      if (!state.continue.has(path.node.label?.name ?? null)) {
        throwError(path);
      }
    },
    ReturnStatement(path) {
      throwError(path);
    },
  });

  function throwError(path: NodePath) {
    throw path.buildCodeFrameError(
      "This control flow escape from do expression is not supported.",
    );
  }
}
