// @flow
import toBlock from "./toBlock";

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 *
 * Returns the BlockStatement
 */
export default function ensureBlock(
  node: Object,
  key: string = "body",
): Object {
  return (node[key] = toBlock(node[key], node));
}
