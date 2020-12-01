// @flow
import shallowEqual from "../utils/shallowEqual";
import isType from "./isType";
import isPlaceholderType from "./isPlaceholderType";
import { FLIPPED_ALIAS_KEYS } from "../definitions";

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 */
export default function is(type: string, node: Object, opts?: Object): boolean {
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

  if (typeof opts === "undefined") {
    return true;
  } else {
    return shallowEqual(node, opts);
  }
}
