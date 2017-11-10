import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import { types as t } from "@babel/core";

export default function(api, { loose = false }) {
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

        const assignment = t.assignmentExpression("=", t.clone(ref), node.left);

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
                    t.clone(ref),
                    scope.buildUndefinedNode(),
                  ),
                ),
            t.clone(ref),
            node.right,
          ),
        );
      },
    },
  };
}
