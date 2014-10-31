var _ = require("lodash");

exports.UnaryExpression = function (node, print) {
  this.push(node.operator);
  if (/[a-z]$/.test(node.operator)) this.push(" ");
  print(node.argument);
};

exports.UpdateExpression = function (node, print) {
  if (node.prefix) {
    this.push(node.operator);
    print(node.argument);
  } else {
    print(node.argument);
    this.push(node.operator);
  }
};

exports.ConditionalExpression = function (node, print) {
  this.push("(");
  print(node.test);
  this.push(" ? ");
  print(node.consequent);
  this.push(" : ");
  print(node.alternate);
  this.push(")");
};

exports.NewExpression = function (node, print) {
  this.push("new ");
  print(node.callee);
  if (node.arguments) {
    this.push("(");
    this.printJoin(print, node.arguments, ", ");
    this.push(")");
  }
};


exports.SequenceExpression = function (node, print) {
  this.printJoin(print, node.expressions, ", ");
};

exports.ThisExpression = function () {
  this.push("this");
};

exports.CallExpression = function (node, print) {
  print(node.callee);
  this.push("(");
  this.printJoin(print, node.arguments, ", ");
  this.push(")");
};

exports._maybeParans = function (node, print) {
  var is = _.contains(["FunctionExpression", "BinaryExpression", "AssignmentExpression"], node.type);
  if (is) this.push("(");
  print(node);
  if (is) this.push(")");
};

exports.YieldExpression = function (node, print) {
  this.push("yield");
  if (node.delegate) this.push("*");
  if (node.argument) {
    this.push(" ");
    print(node.argument);
  }
};

exports.EmptyStatement = function () {

};

exports.ExpressionStatement = function (node, print) {
  print(node.expression);
  this.push(";");
};

exports.BinaryExpression =
exports.LogicalExpression =
exports.AssignmentExpression = function (node, print) {
  print(node.left)
  this.push(" " + node.operator + " ");
  print(node.right);
};

exports.MemberExpression = function (node, print) {
  print(node.object);

  if (node.computed) {
    this.push("[");
    print(node.property)
    this.push("]");
  } else {
    this.push(".");
    print(node.property);
  }
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
  this.push("`");

  var self = this;
  _.each(expr.quasis, function (quasi) {

  });

  this.push("`");
};
