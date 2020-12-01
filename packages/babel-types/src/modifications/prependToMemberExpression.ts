import { memberExpression } from "../builders/generated";

/**
 * Prepend a node to a member expression.
 */
export default function prependToMemberExpression<T extends any>(
  member: T,
  prepend: any,
): T {
  member.object = memberExpression(prepend, member.object);

  return member;
}
