import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  return {
    name: "transform-logical-assignment-operators",
    manipulateOptions: undefined,
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
