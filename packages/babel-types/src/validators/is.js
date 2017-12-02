// @flow
import shallowEqual from "../utils/shallowEqual";
import isType from "./isType";

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */
export default function is(type: string, node: Object, opts?: Object): boolean {
  if (!node) return false;

  const matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return shallowEqual(node, opts);
  }
}
