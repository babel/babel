exports.XJSAttribute = function (node, print) {
  print(node.name);
  if (node.value) {
    this.push("=");
    print(node.value);
  }
};

exports.XJSIdentifier = function (node) {
  this.push(node.name);
};

exports.XJSNamespacedName = function (node, print) {
  print(node.namespace)
  this.push(":");
  print(node.name);
};

exports.XJSMemberExpression = function (node, print) {
  print(node.object);
  this.push(".");
  print(node.property);
};

exports.XJSSpreadAttribute = function (node, print) {
  this.push("{...");
  print(node.argument);
  this.push("}");
};

exports.XJSExpressionContainer = function (node, print) {
  this.push("{");
  print(node.expression);
  this.push("}");
};

exports.XJSElement = function () {
  throw new Error("XJSElement");
};

exports.XJSOpeningElement = function (node, print) {
  this.push("<");
  print(node.name);
  if (node.attributes.length < 0) {
    this.push(" ");
    this.printJoin(print, node.attributes, " ");
  }
  this.push(node.selfClosing ? " />" : ">");;
};

exports.XJSClosingElement = function (node) {
  this.push("</" + node.name + ">");
};

exports.XJSEmptyExpression = function () {

};
