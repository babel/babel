import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function ArrowFunctionExpression(node, parent, scope, file) {
  if (node.shadow) return;
  node.shadow = { this: false };

  var boundThis = t.thisExpression();
  boundThis._shadowedFunctionLiteral = false;

  // make sure that arrow function won't be instantiated
  t.ensureBlock(node).body.unshift(t.expressionStatement(t.callExpression(file.addHelper("new-arrow-check"), [
    t.thisExpression(),
    boundThis
  ])));

  return t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]);
}
