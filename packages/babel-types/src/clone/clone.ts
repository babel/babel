import cloneNode from "./cloneNode";
import type * as t from "..";

/**
 * Create a shallow clone of a `node`, including only
 * properties belonging to the node.
 * @deprecated Use t.cloneNode instead.
 */
export default function clone<T extends t.Node>(node: T): T {
  return cloneNode(node, /* deep */ false);
}
