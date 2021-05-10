import { memberExpression } from "../builders/generated";
import type * as t from "..";

/**
 * Prepend a node to a member expression.
 */
export default function prependToMemberExpression<
  T extends Pick<t.MemberExpression, "object" | "property">,
>(member: T, prepend: t.MemberExpression["object"]): T {
  member.object = memberExpression(prepend, member.object);

  return member;
}
