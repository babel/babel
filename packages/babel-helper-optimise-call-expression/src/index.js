import * as t from "@babel/types";

/**
 * A helper function that generates a new call expression with given thisNode.
 It will also optimize `(...arguments)` to `.apply(arguments)`
 *
 * @export
 * @param {Node} callee The callee of call expression
 * @param {Node} thisNode The desired this of call expression
 * @param {Node[]} args The arguments of call expression
 * @param {boolean} optional Whether the call expression is optional
 * @returns {CallExpression | OptionalCallExpression} The generated new call expression
 */
export default function (
  callee: Node,
  thisNode: Node,
  args: Node[],
  optional: boolean,
): CallExpression | OptionalCallExpression {
  if (
    args.length === 1 &&
    t.isSpreadElement(args[0]) &&
    t.isIdentifier(args[0].argument, { name: "arguments" })
  ) {
    // a.b?.(...arguments);
    if (optional) {
      return t.optionalCallExpression(
        t.optionalMemberExpression(callee, t.identifier("apply"), false, true),
        [thisNode, args[0].argument],
        false,
      );
    }
    // a.b(...arguments);
    return t.callExpression(t.memberExpression(callee, t.identifier("apply")), [
      thisNode,
      args[0].argument,
    ]);
  } else {
    // a.b?.(arg1, arg2)
    if (optional) {
      return t.optionalCallExpression(
        t.optionalMemberExpression(callee, t.identifier("call"), false, true),
        [thisNode, ...args],
        false,
      );
    }
    // a.b(arg1, arg2)
    return t.callExpression(t.memberExpression(callee, t.identifier("call")), [
      thisNode,
      ...args,
    ]);
  }
}
