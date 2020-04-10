import toBlock from "./toBlock";
import type * as types from "../types";

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 *
 * Returns the BlockStatement
 */
export default function ensureBlock(
  node: types.Node,
  key: string = "body",
): types.BlockStatement {
  return (node[key] = toBlock(node[key], node));
}
