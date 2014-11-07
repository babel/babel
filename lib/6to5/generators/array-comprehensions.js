exports.ComprehensionBlock = function (node, print) {
  this.keyword("for");
  this.push("(");
  print(node.left);
  this.push(" of ");
  print(node.right);
  this.push(")");
};

exports.ComprehensionExpression = function (node, print) {
  this.push("[");
  this.printJoin(print, node.blocks, { separator: " " });
  this.space();

  if (node.filter) {
    this.keyword("if");
    this.push("(");
    print(node.filter);
    this.push(")");
    this.space();
  }

  print(node.body);
  this.push("]");
};
