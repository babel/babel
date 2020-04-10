import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";
import type * as types from "../types";

export default function toComputedKey<
  T extends Extract<types.Node, { computed: boolean | null }>
>(
  node: T,
  // @ts-ignore
  key: types.Expression | types.Identifier = node.key || node.property,
): any {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
