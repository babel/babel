import type { NodePath } from "@babel/traverse";

/**
 * Test if a NodePath will be cast to boolean when evaluated.
 *
 * @example
 * // returns true
 * const nodePathAQDotB = NodePath("if (a?.#b) {}").get("test"); // a?.#b
 * willPathCastToBoolean(nodePathAQDotB)
 * @example
 * // returns false
 * willPathCastToBoolean(NodePath("a?.#b"))
 * @todo Respect transparent expression wrappers
 * @see {@link packages/babel-plugin-transform-optional-chaining/src/util.js}
 * @param {NodePath} path
 * @returns {boolean}
 */
export function willPathCastToBoolean(path: NodePath): boolean {
  const maybeWrapped = path;
  const { node, parentPath } = maybeWrapped;
  if (parentPath.isLogicalExpression()) {
    const { operator, right } = parentPath.node;
    if (
      operator === "&&" ||
      operator === "||" ||
      (operator === "??" && node === right)
    ) {
      return willPathCastToBoolean(parentPath);
    }
  }
  if (parentPath.isSequenceExpression()) {
    const { expressions } = parentPath.node;
    if (expressions[expressions.length - 1] === node) {
      return willPathCastToBoolean(parentPath);
    } else {
      // if it is in the middle of a sequence expression, we don't
      // care the return value so just cast to boolean for smaller
      // output
      return true;
    }
  }
  return (
    parentPath.isConditional({ test: node }) ||
    parentPath.isUnaryExpression({ operator: "!" }) ||
    parentPath.isLoop({ test: node })
  );
}
