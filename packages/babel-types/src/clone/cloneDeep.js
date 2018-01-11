// @flow

import cloneNode from "./cloneNode";

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * including only properties belonging to the node.
 * @deprecated Use t.cloneNode instead.
 */
export default function cloneDeep<T: Object>(node: T): T {
  return cloneNode(node);
}
