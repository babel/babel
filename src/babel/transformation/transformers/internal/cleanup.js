export function SequenceExpression(node) {
  if (node.expressions.length === 1) {
    return node.expressions[0];
  }
}
