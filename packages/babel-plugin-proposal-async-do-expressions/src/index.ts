import { declare } from "@babel/helper-plugin-utils";
import syntaxAsyncDoExpressions from "@babel/plugin-syntax-async-do-expressions";

export default declare(({ types: t, assertVersion }) => {
  assertVersion(REQUIRED_VERSION("^7.13.0"));

  return {
    name: "proposal-async-do-expressions",
    inherits: syntaxAsyncDoExpressions,
    visitor: {
      DoExpression: {
        exit(path) {
          if (!path.node.async) {
            // non-async do expressions are handled by proposal-do-expressions
            return;
          }
          // Hoist variable declaration to containing function scope
          // `async do { var x = 1; x }` -> `var x; (async() => { x = 1; return x })()`
          if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
            // polyfill when being run by an older Babel version
            path.scope.hoistVariables ??=
              // eslint-disable-next-line no-restricted-globals
              require("@babel/traverse").Scope.prototype.hoistVariables;
          }
          path.scope.hoistVariables();

          const bodyPath = path.get("body");
          // add implicit returns to all ending expression statements
          const completionRecords = bodyPath.getCompletionRecords();

          for (const p of completionRecords) {
            if (p.isExpressionStatement()) {
              p.replaceWith(t.returnStatement(p.node.expression));
            }
          }

          path.replaceWith(
            t.callExpression(
              t.arrowFunctionExpression([], bodyPath.node, /* async */ true),
              [],
            ),
          );
        },
      },
    },
  };
});
