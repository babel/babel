"use strict";

var isInteger = require("is-integer");
var isNumber  = require("lodash/lang/isNumber");
var t         = require("../../types");

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
  if (hasSpace) this.push(" ");
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
  this.space();
  this.push("?");
  this.space();
  print(node.consequent);
  this.space();
  this.push(":");
  this.space();
  print(node.alternate);
};

exports.NewExpression = function (node, print) {
  this.push("new ");
  print(node.callee);
  if (node.arguments.length || this.format.parentheses) {
    this.push("(");
    print.list(node.arguments);
    this.push(")");
  }
};

exports.SequenceExpression = function (node, print) {
  print.list(node.expressions);
};

exports.ThisExpression = function () {
  this.push("this");
};

exports.CallExpression = function (node, print) {
  print(node.callee);

  this.push("(");

  var separator = ",";

  if (node._prettyCall) {
    separator += "\n";
    this.newline();
    this.indent();
  } else {
    separator += " ";
  }

  print.list(node.arguments, { separator: separator });

  if (node._prettyCall) {
    this.newline();
    this.dedent();
  }

  this.push(")");
};

var buildYieldAwait = function (keyword) {
  return function (node, print) {
    this.push(keyword);

    if (node.delegate || node.all) {
      this.push("*");
    }

    if (node.argument) {
      this.space();
      print(node.argument);
    }
  };
};

exports.YieldExpression = buildYieldAwait("yield");
exports.AwaitExpression = buildYieldAwait("await");

exports.EmptyStatement = function () {
  this.semicolon();
};

exports.ExpressionStatement = function (node, print) {
  print(node.expression);
  this.semicolon();
};

exports.BinaryExpression =
exports.LogicalExpression =
exports.AssignmentPattern =
exports.AssignmentExpression = function (node, print) {
  // todo: add cases where the spaces can be dropped when in compact mode
  print(node.left);
  this.push(" ");
  this.push(node.operator);
  this.push(" ");
  print(node.right);
};

var SCIENTIFIC_NOTATION = /e/i;

exports.MemberExpression = function (node, print) {
  var obj = node.object;
  print(obj);

  if (!node.computed && t.isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  var computed = node.computed;
  if (t.isLiteral(node.property) && isNumber(node.property.value)) {
    computed = true;
  }

  if (computed) {
    this.push("[");
    print(node.property);
    this.push("]");
  } else {
    // 5..toFixed(2);
    if (t.isLiteral(obj) && isInteger(obj.value) && !SCIENTIFIC_NOTATION.test(obj.value.toString())) {
      this.push(".");
    }

    this.push(".");
    print(node.property);
  }
};
