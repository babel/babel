"use strict";

var explode = require("./explode-assignable-expression");
var t       = require("../../types");

module.exports = function (exports, opts) {
  var isAssignment = function (node) {
    return node.operator === opts.operator + "=";
  };

  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function (node, parent, scope, context, file) {
    var expr = node.expression;
    if (!isAssignment(expr)) return;

    var nodes    = [];
    var exploded = explode(expr.left, nodes, file, scope, true);

    nodes.push(t.expressionStatement(
      buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, context, file) {
    if (t.isExpressionStatement(parent)) return;
    if (!isAssignment(node)) return;

    var nodes    = [];
    var exploded = explode(node.left, nodes, file, scope);
    nodes.push(opts.build(exploded.uid, node.right));
    nodes.push(exploded.ref);

    return t.toSequenceExpression(nodes, scope);
  };

  exports.BinaryExpression = function (node) {
    if (node.operator !== opts.operator) return;
    return opts.build(node.left, node.right);
  };
};
