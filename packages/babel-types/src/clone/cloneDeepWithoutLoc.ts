import cloneNode from "./cloneNode";
import type * as t from "..";
/**
 * Create a deep clone of a `node` and all of it's child nodes
 * including only properties belonging to the node.
 * excluding `_private` and location properties.
 */
export default function cloneDeepWithoutLoc<T extends t.Node>(node: T): T {
  return cloneNode(node, /* deep */ true, /* withoutLoc */ true);
}
