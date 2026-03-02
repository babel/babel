import { memberExpression } from "../builders/generated/index.ts";
import type * as t from "../index.ts";

/**
 * Append a node to a member expression.
 */
export default function appendToMemberExpression(
  member: t.MemberExpression,
  append: t.MemberExpression["property"],
  computed: boolean = false,
): t.MemberExpression {
  member.object = memberExpression(
    member.object,
    member.property,
    member.computed,
  );
  member.property = append;
  member.computed = !!computed;

  return member;
}
