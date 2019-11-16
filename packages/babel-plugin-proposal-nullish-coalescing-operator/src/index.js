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

        let ref = scope.maybeGenerateMemoised(node.left);
        let assignment;
        // skip creating extra reference when `left` is static
        if (ref === null) {
          ref = node.left;
          assignment = t.cloneNode(node.left);
        } else {
          assignment = t.assignmentExpression("=", ref, node.left);
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
