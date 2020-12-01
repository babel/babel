import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";

export default function toComputedKey(
  node: any,
  key: any = node.key || node.property,
): any {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
