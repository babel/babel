import { numericLiteral, unaryExpression } from "./generated";

export function buildUndefinedNode() {
  return unaryExpression("void", numericLiteral(0), true);
}
