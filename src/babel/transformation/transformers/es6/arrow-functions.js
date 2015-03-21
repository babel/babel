import * as t from "../../../types";

export var check = t.isArrowFunctionExpression;

export function ArrowFunctionExpression(node) {
  t.ensureBlock(node);

  node.expression = false;
  node.type = "ShadowFunctionExpression";

  return node;
}
