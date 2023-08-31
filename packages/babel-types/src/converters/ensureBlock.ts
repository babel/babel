import toBlock from "./toBlock.ts";
import type * as t from "../index.ts";

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
  // @ts-expect-error Fixme: key may not exist in node, consider remove key = "body"
  const result = toBlock(node[key], node);
  // @ts-expect-error Fixme: key may not exist in node, consider remove key = "body"
  node[key] = result;
  return result;
}
