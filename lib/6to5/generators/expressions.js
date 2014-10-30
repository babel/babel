exports.UnaryExpression = function (node, print) {
  var code = node.operator;
  if (/[a-z]$/.test(node.operator)) code += " ";
  code += this._maybeParans(node.argument, print);
  return code;
};

exports.UpdateExpression = function (node, print) {
  var parts = [print(node.argument)];
  parts.push(node.operator);
  if (node.prefix) parts.reverse();
  return parts.join("");
};

exports.ConditionalExpression = function (node, print) {
  var code = "(";
  code += print(node.test);
  code += " ? ";
  code += print(node.consequent);
  code += " : ";
  code += print(node.alternate);
  code += ")";
  return code;
};

exports.NewExpression = function (node, print) {
  var code = "new ";
  code += print(node.callee);
  if (node.arguments) {
    code += "(" + node.arguments.map(print).join(", ") + ")";
  }
  return code;
};


exports.SequenceExpression = function (node, print) {
  return node.expressions.map(print).join(", ");
};

exports.ThisExpression = function () {
  return "this";
};

exports.CallExpression = function (node, print) {
  var code = "";
  code += this._maybeParans(node.callee, print);
  code += "(" + node.arguments.map(this.buildPrint(node)).join(", ") + ")";
  return code;
};

exports._maybeParans = function (node, print) {
  var code = print(node);
  if (node.type === "AssignmentExpression" ||
      node.type === "FunctionExpression" ||
      node.type === "BinaryExpression") {
    code = "(" + code + ")";
  }
  return code;
};

exports.YieldExpression = function (node, print) {
  var code = "yield";
  if (node.delegate) code += "*";
  if (node.argument) code += " " + print(node.argument);
  return code;
};

exports.EmptyStatement = function () {
  return "";
};

exports.ExpressionStatement = function (node, print) {
  return print(node.expression) + ";";
};

exports.BinaryExpression =
exports.LogicalExpression =
exports.AssignmentExpression = function (node, print) {
  return print(node.left) + " " + node.operator + " " + print(node.right);
};

exports.MemberExpression = function (node, print) {
  var code = this._maybeParans(node.object, print);

  if (node.computed) {
    code += "[" + print(node.property) + "]";
  } else {
    code += "." + print(node.property);
  }

  return code;
};

exports.ParenthesizedExpression = function (node, print) {
  throw new Error("ParenthesizedExpression");
};

exports.TaggedTemplateExpression = function (node, print) {
  throw new Error("TaggedTemplateExpression");
};

exports.TemplateElement = function (node, print) {
  throw new Error("TemplateElement");
};

exports.TemplateLiteral = function (node, print) {
  throw new Error("TemplateLiteral");
};
