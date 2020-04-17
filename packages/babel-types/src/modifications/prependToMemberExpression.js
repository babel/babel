// @flow
import { memberExpression } from "../builders/generated";

/**
 * Prepend a node to a member expression.
 */
export default function prependToMemberExpression<T: Object>(
  member: T,
  prepend: Object,
): T {
  member.object = memberExpression(prepend, member.object);

  return member;
}
