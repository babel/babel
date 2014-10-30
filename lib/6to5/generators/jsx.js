exports.XJSAttribute = function (node, print) {
  var code = print(node.name);
  if (node.value) code += "=" + print(node.value);
  return code;
};

exports.XJSIdentifier = function (node) {
  return node.name;
};

exports.XJSNamespacedName = function (node, print) {
  return print(node.namespace) + ":" + print(node.name);
};

exports.XJSMemberExpression = function (node, print) {
  return print(node.object) + "." + print(node.property);
};

exports.XJSSpreadAttribute = function (node, print) {
  return "{..." + print(node.argument) + "}";
};

exports.XJSExpressionContainer = function (node, print) {
  return "{" + print(node.expression) + "}";
};

exports.XJSElement = function () {
  throw new Error("XJSElement");
};

exports.XJSOpeningElement = function (node, print) {
  var code = "<" + print(node.name);
  if (node.attributes.length < 0) {
    code += " " + node.attributes.map(print).join(" ");
  }
  code += node.selfClosing ? " />" : ">";
  return code;
};

exports.XJSClosingElement = function (node) {
  return "</" + node.name + ">";
};

exports.XJSEmptyExpression = function () {
  return "";
};
