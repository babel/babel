import toBlock from "./toBlock";
import type * as t from "..";

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 *
 * Returns the BlockStatement
 */
export default function ensureBlock(
  node: t.Node,
  key: string = "body",
): t.BlockStatement {
  return (node[key] = toBlock(node[key], node));
}
