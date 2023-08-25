import cloneNode from "./cloneNode.ts";
import type * as t from "../index.ts";

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * including only properties belonging to the node.
 * @deprecated Use t.cloneNode instead.
 */
export default function cloneDeep<T extends t.Node>(node: T): T {
  return cloneNode(node);
}
