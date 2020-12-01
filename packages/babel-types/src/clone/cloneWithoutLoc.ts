import cloneNode from "./cloneNode";
/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */
export default function cloneWithoutLoc<T extends any>(node: T): T {
  return cloneNode(node, /* deep */ false, /* withoutLoc */ true);
}
