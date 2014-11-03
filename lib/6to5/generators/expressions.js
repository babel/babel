var _ = require("lodash");

exports.UnaryExpression = function (node, print) {
  this.push(node.operator);

  var arg = node.argument;
  if (/[a-z]$/.test(node.operator) || arg.type === "UpdateExpression" || arg.type === "UnaryExpression") {
    this.push(" ");
  }

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
  print(node.test);
  this.push(" ? ");
  print(node.consequent);
  this.push(" : ");
  print(node.alternate);
};

exports.NewExpression = function (node, print) {
  this.push("new ");
  print(node.callee);
  if (node.arguments.length) {
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

exports.YieldExpression = function (node, print) {
  this.push("yield");
  if (node.delegate) this.push("*");
  if (node.argument) {
    this.push(" ");
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
exports.AssignmentExpression = function (node, print, parent) {
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
