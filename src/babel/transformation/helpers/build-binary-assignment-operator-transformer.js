import explode from "./explode-assignable-expression";
import * as t from "../../types";

export default function (exports, opts) {
  var isAssignment = function (node) {
    return node.operator === opts.operator + "=";
  };

  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function (node, parent, scope, file) {
    // hit the `AssignmentExpression` one below
    if (file.isConsequenceExpressionStatement(node)) return;

    var expr = node.expression;
    if (!isAssignment(expr)) return;

    var nodes    = [];
    var exploded = explode(expr.left, nodes, file, scope, true);

    nodes.push(t.expressionStatement(
      buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, file) {
    if (!isAssignment(node)) return;

    var nodes    = [];
    var exploded = explode(node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    return nodes;
  };

  exports.BinaryExpression = function (node) {
    if (node.operator !== opts.operator) return;
    return opts.build(node.left, node.right);
  };
};
