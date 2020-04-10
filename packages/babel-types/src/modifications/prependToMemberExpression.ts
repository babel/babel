import { memberExpression } from "../builders/generated";
import type * as types from "../types";

/**
 * Prepend a node to a member expression.
 */
export default function prependToMemberExpression<
  T extends Pick<types.MemberExpression, "object" | "property">
>(member: T, prepend: types.MemberExpression["object"]): T {
  member.object = memberExpression(prepend, member.object);

  return member;
}
