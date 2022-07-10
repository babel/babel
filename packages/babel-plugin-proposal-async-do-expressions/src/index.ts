import { declare } from "@babel/helper-plugin-utils";
import syntaxAsyncDoExpressions from "@babel/plugin-syntax-async-do-expressions";
import hoistVariables from "@babel/helper-hoist-variables";
import type * as t from "@babel/types";

export default declare(({ types: t, assertVersion }) => {
  assertVersion("^7.13.0");

  return {
    name: "proposal-async-do-expressions",
    inherits: syntaxAsyncDoExpressions,
    visitor: {
      DoExpression: {
        exit(path) {
          if (!path.is("async")) {
            // non-async do expressions are handled by proposal-do-expressions
            return;
          }
          const { scope } = path;
          // Hoist variable declaration to containing function scope
          // `async do { var x = 1; x }` -> `var x; (async() => { x = 1; return x })()`
          hoistVariables(
            path,
            (id: t.Identifier) => {
              scope.push({ id: t.cloneNode(id) });
            },
            "var",
          );
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
