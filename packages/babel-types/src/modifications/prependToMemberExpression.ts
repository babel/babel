import { memberExpression } from "../builders/generated";
import { isSuper } from "..";
import type * as t from "..";

/**
 * Prepend a node to a member expression.
 */
export default function prependToMemberExpression<
  T extends Pick<t.MemberExpression, "object" | "property">,
>(member: T, prepend: t.MemberExpression["object"]): T {
  if (isSuper(member.object)) {
    throw new Error(
      "Cannot prepend node to super property access (`super.foo`).",
    );
  }
  member.object = memberExpression(prepend, member.object);

  return member;
}
