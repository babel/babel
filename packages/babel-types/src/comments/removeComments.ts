import { COMMENT_KEYS } from "../constants";
import type * as types from "../types";

/**
 * Remove comment properties from a node.
 */
export default function removeComments<T extends types.Node>(node: T): T {
  COMMENT_KEYS.forEach(key => {
    node[key] = null;
  });

  return node;
}
