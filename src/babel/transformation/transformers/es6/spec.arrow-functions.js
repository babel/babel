import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function ArrowFunctionExpression(node, parent, scope, file) {
  if (node.shadow) return;
  node.shadow = { this: false };

  var {id} = node;
  var expr = node;

  if (!id) {
    id = scope.parent.generateDeclaredUidIdentifier("arrow");
    expr = t.assignmentExpression("=", id, expr);
  }

  // make sure that arrow function won't be instantiated
  t.ensureBlock(node).body.unshift(t.expressionStatement(t.callExpression(file.addHelper("new-arrow-check"), [
    t.thisExpression(),
    id
  ])));

  return t.callExpression(t.memberExpression(expr, t.identifier("bind")), [t.thisExpression()]);
}
