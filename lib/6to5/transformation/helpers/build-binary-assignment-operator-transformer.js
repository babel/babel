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
    var absRef = explode(expr.left, nodes, file, scope);

    nodes.push(t.expressionStatement(
      buildAssignment(absRef, opts.build(absRef, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, context, file) {
    if (t.isExpressionStatement(parent)) return;
    if (!isAssignment(node)) return;

    var nodes    = [];
    var absRef = explode(node.left, nodes, file, scope);
    nodes.push(opts.build(absRef, node.right));
    nodes.push(absRef);

    return t.toSequenceExpression(nodes, scope);
  };

  exports.BinaryExpression = function (node) {
    if (node.operator !== opts.operator) return;
    return opts.build(node.left, node.right);
  };
};
