import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-logical-assignment-operators",
    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("logicalAssignment"),

    visitor: {
      AssignmentExpression(path) {
        const { node, scope } = path;
        const { operator, left, right } = node;
        const operatorTrunc = operator.slice(0, -1);
        if (!t.LOGICAL_OPERATORS.includes(operatorTrunc)) {
          return;
        }

        const lhs = t.cloneNode(left) as t.Identifier | t.MemberExpression;
        if (t.isMemberExpression(left)) {
          const { object, property, computed } = left;
          const memo = scope.maybeGenerateMemoised(object);
          if (memo) {
            left.object = memo;
            (lhs as t.MemberExpression).object = t.assignmentExpression(
              "=",
              t.cloneNode(memo),
              // object must not be Super when `memo` is an identifier
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              object as t.Expression,
            );
          }

          if (computed) {
            const memo = scope.maybeGenerateMemoised(property);
            if (memo) {
              left.property = memo;
              (lhs as t.MemberExpression).property = t.assignmentExpression(
                "=",
                t.cloneNode(memo),
                // @ts-expect-error todo(flow->ts): property can be t.PrivateName
                property,
              );
            }
          }
        }

        path.replaceWith(
          t.logicalExpression(
            // @ts-expect-error operatorTrunc has been tested by t.LOGICAL_OPERATORS
            operatorTrunc,
            lhs,
            t.assignmentExpression("=", left, right),
          ),
        );
      },
    },
  };
});
