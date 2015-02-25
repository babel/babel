"use strict";

var explode = require("./explode-assignable-expression");
var t       = require("../../types");

module.exports = function (exports, opts) {
  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function (node, parent, scope, file) {
    // hit the `AssignmentExpression` one below
    if (file.isConsequenceExpressionStatement(node)) return;

    var expr = node.expression;
    if (!opts.is(expr, file)) return;

    var nodes = [];

    var exploded = explode(expr.left, nodes, file, scope);

    nodes.push(t.ifStatement(
      opts.build(exploded.uid, file),
      t.expressionStatement(buildAssignment(exploded.ref, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, file) {
    if (!opts.is(node, file)) return;

    var nodes    = [];
    var exploded = explode(node.left, nodes, file, scope);

    nodes.push(t.logicalExpression(
      "&&",
      opts.build(exploded.uid, file),
      buildAssignment(exploded.ref, node.right)
    ));

    // todo: duplicate expression node
    nodes.push(exploded.ref);

    return t.toSequenceExpression(nodes, scope);
  };
};
