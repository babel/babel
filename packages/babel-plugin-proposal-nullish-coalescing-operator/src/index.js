import { declare } from "@babel/helper-plugin-utils";
import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import { types as t } from "@babel/core";

export default declare((api, { loose = false }) => {
  api.assertVersion(7);

  return {
    inherits: syntaxNullishCoalescingOperator,

    visitor: {
      LogicalExpression(path) {
        const { node, scope } = path;
        if (node.operator !== "??") {
          return;
        }

        const ref = scope.generateUidIdentifierBasedOnNode(node.left);
        scope.push({ id: ref });

        const assignment = t.assignmentExpression(
          "=",
          t.cloneNode(ref),
          node.left,
        );

        path.replaceWith(
          t.conditionalExpression(
            // We cannot use `!= null` in spec mode because
            // `document.all == null` and `document.all` is not "nullish".
            loose
              ? t.binaryExpression("!=", assignment, t.nullLiteral())
              : t.logicalExpression(
                  "&&",
                  t.binaryExpression("!==", assignment, t.nullLiteral()),
                  t.binaryExpression(
                    "!==",
                    t.cloneNode(ref),
                    scope.buildUndefinedNode(),
                  ),
                ),
            t.cloneNode(ref),
            node.right,
          ),
        );
      },
    },
  };
});
