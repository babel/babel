import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import syntaxSwitchExpressions from "@babel/plugin-syntax-switch-expressions";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-switch-expressions",
    inherits: syntaxSwitchExpressions,

    visitor: {
      SwitchExpression: {
        exit(path) {
          const { discriminant, cases } = path.node;

          const resultCases = [];

          for (const c of cases) {
            const block = [
              t.returnStatement(t.callExpression(c.expression, [])),
            ];

            if (c.tests.length === 0) {
              resultCases.push(t.switchCase(null, block));
            } else {
              c.tests.forEach(test => {
                resultCases.push(t.switchCase(test, block));
              });
            }
          }

          const arrow = t.functionExpression(
            null,
            [],
            t.blockStatement([t.switchStatement(discriminant, resultCases)]),
          );

          path.replaceWith(t.callExpression(arrow, []));
        },
      },
    },
  };
});
