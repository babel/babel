exports.ClassExpression =
exports.ClassDeclaration = function (node, print) {
  var parts = ["class"];

  if (node.id) parts.push(" ", print(node.id));

  if (node.superClass) parts.push(" extends ", print(node.superClass));

  parts.push(" ", print(node.body));

  return parts.join("");
};

exports.ClassBody = function (node, print) {
  if (node.body.length === 0) {
    return "{}";
  }

  return [
    "{\n",
    this.indent(node.body.map(print).join("")),
    "\n}"
  ].join("");
};
