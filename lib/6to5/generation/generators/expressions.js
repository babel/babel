var t = require("../../types");

exports.UnaryExpression = function (node, print) {
  var hasSpace = /[a-z]$/.test(node.operator);
  var arg = node.argument;

  if (t.isUpdateExpression(arg) || t.isUnaryExpression(arg)) {
    hasSpace = true;
  }

  if (t.isUnaryExpression(arg) && arg.operator === "!") {
    hasSpace = false;
  }

  this.push(node.operator);
  if (hasSpace) this.space();
  print(node.argument);
};

exports.ParenthesizedExpression = function (node, print) {
  this.push("(");
  print(node.expression);
  this.push(")");
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
  print(node.test);
  this.push(" ? ");
  print(node.consequent);
  this.push(" : ");
  print(node.alternate);
};

exports.NewExpression = function (node, print) {
  this.push("new ");
  print(node.callee);
  this.push("(");
  print.join(node.arguments, { separator: ", " });
  this.push(")");
};

exports.SequenceExpression = function (node, print) {
  print.join(node.expressions, { separator: ", " });
};

exports.ThisExpression = function () {
  this.push("this");
};

exports.CallExpression = function (node, print) {
  print(node.callee);
  this.push("(");
  print.join(node.arguments, { separator: ", " });
  this.push(")");
};

exports.YieldExpression = function (node, print) {
  this.push("yield");
  if (node.delegate) this.push("*");
  if (node.argument) {
    this.space();
    print(node.argument);
  }
};

exports.EmptyStatement = function () {
  this.semicolon();
};

exports.ExpressionStatement = function (node, print) {
  print(node.expression);
  this.semicolon();
};

exports.BinaryExpression =
exports.LogicalExpression =
exports.AssignmentExpression = function (node, print) {
  print(node.left);
  this.push(" " + node.operator + " ");
  print(node.right);
};

exports.MemberExpression = function (node, print) {
  print(node.object);

  if (node.computed) {
    this.push("[");
    print(node.property);
    this.push("]");
  } else {
    this.push(".");
    print(node.property);
  }
};
