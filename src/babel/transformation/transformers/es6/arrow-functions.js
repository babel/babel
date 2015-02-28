import t from "../../../types";

export var check = t.isArrowFunctionExpression;

export function ArrowFunctionExpression(node) {
  t.ensureBlock(node);

  node._aliasFunction = "arrow";
  node.expression = false;
  node.type = "FunctionExpression";

  return node;
}
