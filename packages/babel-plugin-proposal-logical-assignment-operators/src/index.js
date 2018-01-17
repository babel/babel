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

        let ref;
        if (t.isMemberExpression(left)) {
          const { object } = left;
          const memo = scope.maybeGenerateMemoised(object);
          if (memo) {
            path
              .get("left.object")
              .replaceWith(
                t.assignmentExpression("=", t.cloneNode(memo), object),
              );

            ref = t.cloneNode(left);
            ref.object = t.cloneNode(memo);
          }
        }

        path.replaceWith(
          t.logicalExpression(
            operator.slice(0, -1),
            left,
            t.assignmentExpression("=", ref || t.cloneNode(left), right),
          ),
        );
      },
    },
  };
});
