var explode = require("./explode-assignable-expression");
var t       = require("../../types");

module.exports = function (exports, opts) {
  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function (node, parent, scope, context, file) {
    var expr = node.expression;
    if (!opts.is(expr, file)) return;

    var nodes = [];

    var absRef = explode(expr.left, nodes, file, scope);

    nodes.push(t.ifStatement(
      opts.build(absRef, file),
      t.expressionStatement(buildAssignment(absRef, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, context, file) {
    if (t.isExpressionStatement(parent)) return;
    if (!opts.is(node, file)) return;

    var nodes    = [];
    var absRef = explode(node.left, nodes, file, scope);

    nodes.push(t.logicalExpression(
      "&&",
      opts.build(absRef, file),
      buildAssignment(absRef, node.right)
    ));

    nodes.push(absRef);

    return t.toSequenceExpression(nodes, scope);
  };
};
