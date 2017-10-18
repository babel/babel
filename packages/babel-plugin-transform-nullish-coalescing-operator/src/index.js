import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";

export default function({ types: t }) {
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

        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", ref, node.left),
            t.conditionalExpression(
              t.binaryExpression("!=", t.clone(ref), t.nullLiteral()),
              t.clone(ref),
              node.right,
            ),
          ]),
        );
      },
    },
  };
}
