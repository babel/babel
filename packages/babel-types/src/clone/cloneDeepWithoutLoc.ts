import cloneNode from "./cloneNode.ts";
import type * as t from "../index.ts";
/**
 * Create a deep clone of a `node` and all of it's child nodes
 * including only properties belonging to the node.
 * excluding `_private` and location properties.
 */
export default function cloneDeepWithoutLoc<T extends t.Node>(node: T): T {
  return cloneNode(node, /* deep */ true, /* withoutLoc */ true);
}
