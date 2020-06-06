import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";
import type * as types from "../types";

export default function toComputedKey(
  node: any,
  key: types.Expression = node.key || node.property,
) {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
