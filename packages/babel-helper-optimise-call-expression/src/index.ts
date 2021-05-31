import * as t from "@babel/types";
import type {
  CallExpression,
  Expression,
  OptionalCallExpression,
  SpreadElement,
} from "@babel/types";

/**
 * A helper function that generates a new call expression with given thisNode.
 It will also optimize `(...arguments)` to `.apply(arguments)`
 *
 * @export
 * @param {Expression} callee The callee of call expression
 * @param {Expression} thisNode The desired this of call expression
 * @param {Readonly<Array<Expression | SpreadElement>>} args The arguments of call expression
 * @param {boolean} optional Whether the call expression is optional
 * @returns {CallExpression | OptionalCallExpression} The generated new call expression
 */
export default function optimiseCallExpression(
  callee: Expression,
  thisNode: Expression,
  args: Readonly<Array<Expression | SpreadElement>>,
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
