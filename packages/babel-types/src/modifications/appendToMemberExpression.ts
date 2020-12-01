import { memberExpression } from "../builders/generated";
import type * as t from "../types";

/**
 * Append a node to a member expression.
 */
export default function appendToMemberExpression<T extends t.MemberExpression>(
  member: T,
  append: t.MemberExpression["property"],
  computed: boolean = false,
): T {
  member.object = memberExpression(
    member.object,
    member.property,
    member.computed,
  );
  member.property = append;
  member.computed = !!computed;

  return member;
}
