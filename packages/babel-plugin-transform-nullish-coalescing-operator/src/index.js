import syntaxNullishCoalescingOperator from "babel-plugin-syntax-nullish-coalescing-operator";

const OPERATOR = "??";

export default function({ types: t }) {
  return {
    inherits: syntaxNullishCoalescingOperator,

    visitor: {
      LogicalExpression(path) {
        const { node } = path;
        if (node.operator !== OPERATOR) {
          return;
        }

        const scope = path.scope.parent || path.scope;
        const ref = scope.generateUidIdentifier("ref");
        scope.push({ id: ref });

        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", ref, node.left),
            t.conditionalExpression(
              t.binaryExpression("!=", ref, t.nullLiteral()),
              ref,
              node.right,
            ),
          ]),
        );
      },
    },
  };
}
