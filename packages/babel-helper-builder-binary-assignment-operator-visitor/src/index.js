import explode from "babel-helper-explode-assignable-expression";
import * as t from "babel-types";

export default function (opts: {
  build: Function;
  operator: string;
}): Object {
  let visitor = {};

  function isAssignment(node) {
    return node && node.operator === opts.operator + "=";
  }

  function buildAssignment(left, right) {
    return t.assignmentExpression("=", left, right);
  }

  visitor.ExpressionStatement = function (path, file) {
    // hit the `AssignmentExpression` one below
    if (path.isCompletionRecord()) return;

    let expr = path.node.expression;
    if (!isAssignment(expr)) return;

    let nodes    = [];
    let exploded = explode(expr.left, nodes, file, path.scope, true);

    nodes.push(t.expressionStatement(
      buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))
    ));

    path.replaceWithMultiple(nodes);
  };

  visitor.AssignmentExpression = function (path, file) {
    let { node, scope } = path;
    if (!isAssignment(node)) return;

    let nodes    = [];
    let exploded = explode(node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    path.replaceWithMultiple(nodes);
  };

  visitor.BinaryExpression = function (path) {
    let { node } = path;
    if (node.operator === opts.operator) {
      path.replaceWith(opts.build(node.left, node.right));
    }
  };

  return visitor;
}
