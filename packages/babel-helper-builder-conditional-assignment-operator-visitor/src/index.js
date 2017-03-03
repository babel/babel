import explode from "babel-helper-explode-assignable-expression";
import * as t from "babel-types";

export default function(
  exports: Object,
  opts: {
    build: Function,
    is: Function,
  },
) {
  const buildAssignment = function(left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.ExpressionStatement = function(path, file) {
    // hit the `AssignmentExpression` one below
    if (path.isCompletionRecord()) return;

    const expr = path.node.expression;
    if (!opts.is(expr, file)) return;

    const nodes = [];

    const exploded = explode(expr.left, nodes, file, path.scope);

    nodes.push(
      t.ifStatement(
        opts.build(exploded.uid, file),
        t.expressionStatement(buildAssignment(exploded.ref, expr.right)),
      ),
    );

    return nodes;
  };

  exports.AssignmentExpression = function(path, file) {
    const node = path.node;
    if (!opts.is(node, file)) return;

    const nodes = [];
    const exploded = explode(node.left, nodes, file, path.scope);

    nodes.push(
      t.logicalExpression(
        "&&",
        opts.build(exploded.uid, file),
        buildAssignment(exploded.ref, node.right),
      ),
    );

    // todo: duplicate expression node
    nodes.push(exploded.ref);

    return nodes;
  };
}
