// @flow
import { COMMENT_KEYS } from "../constants";

const CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];

const CLEAR_KEYS_PLUS_COMMENTS = COMMENT_KEYS.concat(["comments"]).concat(
  CLEAR_KEYS,
);

/**
 * Remove all of the _* properties from a node along with the additional metadata
 * properties like location data and raw token data.
 */
export default function removeProperties(
  node: Object,
  opts?: Object = {},
): void {
  const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (const key of map) {
    if (node[key] != null) node[key] = undefined;
  }

  for (const key in node) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  const symbols: Array<Symbol> = Object.getOwnPropertySymbols(node);
  for (const sym of symbols) {
    node[sym] = null;
  }
}
