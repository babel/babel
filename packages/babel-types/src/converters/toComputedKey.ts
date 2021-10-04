import { isIdentifier } from "../validators/generated";
import { stringLiteral } from "../builders/generated";
import type * as t from "..";

export default function toComputedKey(
  node:
    | t.ObjectMember
    | t.ObjectProperty
    | t.ClassMethod
    | t.ClassProperty
    | t.ClassAccessorProperty
    | t.MemberExpression
    | t.OptionalMemberExpression,
  // @ts-expect-error todo(flow->ts): maybe check the type of node before accessing .key and .property
  key: t.Expression = node.key || node.property,
) {
  if (!node.computed && isIdentifier(key)) key = stringLiteral(key.name);

  return key;
}
