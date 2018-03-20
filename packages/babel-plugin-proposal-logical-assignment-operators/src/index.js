import { declare } from "@babel/helper-plugin-utils";
import syntaxLogicalAssignmentOperators from "@babel/plugin-syntax-logical-assignment-operators";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    inherits: syntaxLogicalAssignmentOperators,

    visitor: {
      AssignmentExpression(path) {
        const { node, scope } = path;
        const { operator, left, right } = node;
        if (operator !== "||=" && operator !== "&&=") {
          return;
        }

        const lhs = t.cloneNode(left);
        if (t.isMemberExpression(left)) {
          const { object, property, computed } = left;
          const memo = scope.maybeGenerateMemoised(object);
          if (memo) {
            left.object = memo;
            lhs.object = t.assignmentExpression("=", t.cloneNode(memo), object);
          }

          if (computed) {
            const memo = scope.maybeGenerateMemoised(property);
            if (memo) {
              left.property = memo;
              lhs.property = t.assignmentExpression(
                "=",
                t.cloneNode(memo),
                property,
              );
            }
          }
        }

        path.replaceWith(
          t.logicalExpression(
            operator.slice(0, -1),
            lhs,
            t.assignmentExpression("=", left, right),
          ),
        );
      },
    },
  };
});
