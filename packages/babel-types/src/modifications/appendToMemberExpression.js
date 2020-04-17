// @flow
import { memberExpression } from "../builders/generated";

/**
 * Append a node to a member expression.
 */
export default function appendToMemberExpression<T: Object>(
  member: T,
  append: Object,
  computed?: boolean = false,
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
