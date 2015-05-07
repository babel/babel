import * as t from "../../../types";

export function ArrowFunctionExpression(node) {
  t.ensureBlock(node);

  node.expression = false;
  node.type = "FunctionExpression";
  node.shadow = true;
}
