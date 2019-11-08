// @flow
import cloneNode from "./cloneNode";
/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */
export default function cloneWithoutLoc<T: Object>(node: T): T {
  const newNode = cloneNode(node, /* deep */ false, /* withoutLoc */ true);

  return newNode;
}
