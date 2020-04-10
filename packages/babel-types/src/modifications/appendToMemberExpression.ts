import { memberExpression } from "../builders/generated";
import type * as types from "../types";

/**
 * Append a node to a member expression.
 */
export default function appendToMemberExpression<
  T extends Pick<types.MemberExpression, "object" | "property">
>(
  member: T,
  append: types.MemberExpression["property"],
  computed: boolean = false,
): T {
  member.object = memberExpression(
    member.object,
    member.property,
    // @ts-ignore
    member.computed,
  );
  member.property = append;
  // @ts-ignore
  member.computed = !!computed;

  return member;
}
