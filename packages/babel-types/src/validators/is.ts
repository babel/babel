import shallowEqual from "../utils/shallowEqual.ts";
import isType from "./isType.ts";
import isPlaceholderType from "./isPlaceholderType.ts";
import { FLIPPED_ALIAS_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

export default function is<T extends t.Node["type"]>(
  type: T,
  node: t.Node | null | undefined,
  opts?: undefined,
): node is Extract<t.Node, { type: T }>;

export default function is<
  T extends t.Node["type"],
  P extends Extract<t.Node, { type: T }>,
>(type: T, n: t.Node | null | undefined, required: Partial<P>): n is P;

export default function is<P extends t.Node>(
  type: string,
  node: t.Node | null | undefined,
  opts: Partial<P>,
): node is P;

export default function is(
  type: string,
  node: t.Node | null | undefined,
  opts?: Partial<t.Node>,
): node is t.Node;
/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 */
export default function is(
  type: string,
  node: t.Node | null | undefined,
  opts?: Partial<t.Node>,
): node is t.Node {
  if (!node) return false;

  const matches = isType(node.type, type);
  if (!matches) {
    if (!opts && node.type === "Placeholder" && type in FLIPPED_ALIAS_KEYS) {
      // We can only return true if the placeholder doesn't replace a real node,
      // but it replaces a category of nodes (an alias).
      //
      // t.is("Identifier", node) gives some guarantees about node's shape, so we
      // can't say that Placeholder(expectedNode: "Identifier") is an identifier
      // because it doesn't have the same properties.
      // On the other hand, t.is("Expression", node) doesn't say anything about
      // the shape of node because Expression can be many different nodes: we can,
      // and should, safely report expression placeholders as Expressions.
      return isPlaceholderType(node.expectedNode, type);
    }
    return false;
  }

  if (opts === undefined) {
    return true;
  } else {
    return shallowEqual(node, opts);
  }
}
