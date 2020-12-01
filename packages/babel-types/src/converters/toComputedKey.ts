import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";
import type * as t from "../types";

export default function toComputedKey(
  node: any,
  key: t.Expression = node.key || node.property,
) {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
