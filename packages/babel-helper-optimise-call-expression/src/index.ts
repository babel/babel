import { types as t } from "@babel/core";
const {
  callExpression,
  identifier,
  isIdentifier,
  isSpreadElement,
  memberExpression,
  optionalCallExpression,
  optionalMemberExpression,
} = t;

/**
 * A helper function that generates a new call expression with given thisNode.
 It will also optimize `(...arguments)` to `.apply(arguments)`
 *
 * @export
 * @param {Expression} callee The callee of call expression
 * @param {Expression} thisNode The desired this of call expression
 * @param {Readonly<CallExpression["arguments"]>} args The arguments of call expression
 * @param {boolean} optional Whether the call expression is optional
 * @returns {CallExpression | OptionalCallExpression} The generated new call expression
 */
export default function optimiseCallExpression(
  callee: t.Expression,
  thisNode: t.Expression,
  args: Readonly<t.CallExpression["arguments"]>,
  optional: boolean,
): t.CallExpression | t.OptionalCallExpression {
  if (
    args.length === 1 &&
    isSpreadElement(args[0]) &&
    isIdentifier(args[0].argument, { name: "arguments" })
  ) {
    // a.b?.(...arguments);
    if (optional) {
      return optionalCallExpression(
        optionalMemberExpression(callee, identifier("apply"), false, true),
        [thisNode, args[0].argument],
        false,
      );
    }
    // a.b(...arguments);
    return callExpression(memberExpression(callee, identifier("apply")), [
      thisNode,
      args[0].argument,
    ]);
  } else {
    // a.b?.(arg1, arg2)
    if (optional) {
      return optionalCallExpression(
        optionalMemberExpression(callee, identifier("call"), false, true),
        [thisNode, ...args],
        false,
      );
    }
    // a.b(arg1, arg2)
    return callExpression(memberExpression(callee, identifier("call")), [
      thisNode,
      ...args,
    ]);
  }
}
