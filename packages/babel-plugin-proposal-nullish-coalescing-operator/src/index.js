import { declare } from "@babel/helper-plugin-utils";
import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import { types as t } from "@babel/core";

export default declare((api, { loose = false }) => {
  api.assertVersion(7);

  return {
    name: "proposal-nullish-coalescing-operator",
    inherits: syntaxNullishCoalescingOperator,

    visitor: {
      LogicalExpression(path) {
        const { node, scope } = path;
        if (node.operator !== "??") {
          return;
        }

        let ref, assignment;
        // skip creating extra reference when `left` is semantically safe to re-use
        if (t.isIdentifier(node.left)) {
          ref = node.left;
          assignment = t.cloneNode(node.left);
        } else {
          ref = scope.generateUidIdentifierBasedOnNode(node.left);
          scope.push({ id: ref });

          assignment = t.assignmentExpression("=", t.cloneNode(ref), node.left);
        }

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
