// @flow
import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";

export default function toComputedKey(
  node: Object,
  key: Object = node.key || node.property,
): Object {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
