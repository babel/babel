import type { types as t, NodePath, Visitor } from "@babel/core";
import { visitors } from "@babel/traverse";
import { declare } from "@babel/helper-plugin-utils";

export default declare(({ types: t, assertVersion }) => {
  assertVersion(REQUIRED_VERSION(7));

  const containsClassExpressionVisitor: Visitor<{ found: boolean }> = {
    ClassExpression(path, state) {
      state.found = true;
      path.stop();
    },
    Function(path) {
      path.skip();
    },
  };

  const containsYieldOrAwaitVisitor = visitors.environmentVisitor<{
    yield: boolean;
    await: boolean;
  }>({
    YieldExpression(path, state) {
      state.yield = true;
      if (state.await) path.stop();
    },
    AwaitExpression(path, state) {
      state.await = true;
      if (state.yield) path.stop();
    },
  });

  function containsClassExpression(path: NodePath<t.Node>) {
    if (t.isClassExpression(path.node)) return true;
    if (t.isFunction(path.node)) return false;
    const state = { found: false };
    path.traverse(containsClassExpressionVisitor, state);
    return state.found;
  }

  function wrap(path: NodePath<t.Expression>) {
    const context = {
      yield: t.isYieldExpression(path.node),
      await: t.isAwaitExpression(path.node),
    };
    path.traverse(containsYieldOrAwaitVisitor, context);

    let replacement;

    if (context.yield) {
      const fn = t.functionExpression(
        null,
        [],
        t.blockStatement([t.returnStatement(path.node)]),
        /* generator */ true,
        /* async */ context.await,
      );

      replacement = t.yieldExpression(
        t.callExpression(t.memberExpression(fn, t.identifier("call")), [
          t.thisExpression(),
          // NOTE: In some context arguments is invalid (it might not be defined
          // in the top-level scope, or it's a syntax error in static class blocks).
          // However, `yield` is also invalid in those contexts, so we can safely
          // inject a reference to arguments.
          t.identifier("arguments"),
        ]),
        true,
      );
    } else {
      const fn = t.arrowFunctionExpression([], path.node, context.await);

      replacement = t.callExpression(fn, []);
      if (context.await) replacement = t.awaitExpression(replacement);
    }

    path.replaceWith(replacement);
  }

  return {
    name: "bugfix-firefox-class-in-computed-class-key",

    visitor: {
      Class(path) {
        const hasPrivateElement = path.node.body.body.some(node =>
          t.isPrivate(node),
        );
        if (!hasPrivateElement) return;

        for (const elem of path.get("body.body")) {
          if (
            "computed" in elem.node &&
            elem.node.computed &&
            containsClassExpression(elem.get("key"))
          ) {
            wrap(
              // @ts-expect-error .key also includes t.PrivateName
              elem.get("key") satisfies NodePath<t.Expression>,
            );
          }
        }
      },
    },
  };
});
