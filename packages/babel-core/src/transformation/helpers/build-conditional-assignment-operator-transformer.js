import explode from "./explode-assignable-expression";
import * as t from "babel-types";

export default function (exports, opts) {
  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function (path, file) {
    // hit the `AssignmentExpression` one below
    if (path.isCompletionRecord()) return;

    var expr = path.node.expression;
    if (!opts.is(expr, file)) return;

    var nodes = [];

    var exploded = explode(expr.left, nodes, file, path.scope);

    nodes.push(t.ifStatement(
      opts.build(exploded.uid, file),
      t.expressionStatement(buildAssignment(exploded.ref, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (path, file) {
    var node = path.node;
    if (!opts.is(node, file)) return;

    var nodes    = [];
    var exploded = explode(node.left, nodes, file, path.scope);

    nodes.push(t.logicalExpression(
      "&&",
      opts.build(exploded.uid, file),
      buildAssignment(exploded.ref, node.right)
    ));

    // todo: duplicate expression node
    nodes.push(exploded.ref);

    return nodes;
  };
}
