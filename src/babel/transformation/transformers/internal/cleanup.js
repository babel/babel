export var SequenceExpression = {
  exit(node) {
    if (node.expressions.length === 1) {
      return node.expressions[0];
    } else if (!node.expressions.length) {
      this.remove();
    }
  }
};

export var ExpressionStatement = {
  exit(node) {
    if (!node.expression) this.remove();
  }
};

export var Binary = {
  exit(node) {
    var right = node.right;
    var left  = node.left;

    if (!left && !right) {
      this.remove();
    } else if (!left) {
      return right;
    } else if (!right) {
      return left;
    }
  }
};
