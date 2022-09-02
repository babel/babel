import { COMMENT_KEYS } from "../constants";
import type * as t from "..";

const CLEAR_KEYS = [
  "tokens", // only exist in t.File
  "start",
  "end",
  "loc",
  // Fixme: should be extra.raw / extra.rawValue?
  "raw",
  "rawValue",
] as const;

const CLEAR_KEYS_PLUS_COMMENTS = [
  ...COMMENT_KEYS,
  "comments",
  ...CLEAR_KEYS,
] as const;

export type Options = { preserveComments?: boolean };
/**
 * Remove all of the _* properties from a node along with the additional metadata
 * properties like location data and raw token data.
 */
export default function removeProperties(
  node: t.Node,
  opts: Options = {},
): void {
  const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (const key of map) {
    // @ts-expect-error tokens only exist in t.File
    if (node[key] != null) node[key] = undefined;
  }

  for (const key of Object.keys(node)) {
    // @ts-expect-error string can not index node
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  const symbols: Array<symbol> = Object.getOwnPropertySymbols(node);
  for (const sym of symbols) {
    // @ts-expect-error Fixme: document symbol properties
    node[sym] = null;
  }
}
