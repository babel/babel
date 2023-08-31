import cloneNode from "./cloneNode.ts";
import type * as t from "../index.ts";

/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */
export default function cloneWithoutLoc<T extends t.Node>(node: T): T {
  return cloneNode(node, /* deep */ false, /* withoutLoc */ true);
}
