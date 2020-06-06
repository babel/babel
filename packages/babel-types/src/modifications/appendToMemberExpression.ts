import { memberExpression } from "../builders/generated";
import type * as types from "../types";

/**
 * Append a node to a member expression.
 */
export default function appendToMemberExpression<
  T extends types.MemberExpression
>(
  member: T,
  append: types.MemberExpression["property"],
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
