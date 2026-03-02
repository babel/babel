import { numericLiteral, unaryExpression } from "./generated/index.ts";

export function buildUndefinedNode() {
  return unaryExpression("void", numericLiteral(0), true);
}
