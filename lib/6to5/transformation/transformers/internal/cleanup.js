exports.SequenceExpression = function (node) {
  if (node.expressions.length === 1) {
    return node.expressions[0];
  }
};
