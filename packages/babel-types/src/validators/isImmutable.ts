import isType from "./isType";
import { isIdentifier } from "./generated";
import type * as types from "../types";

/**
 * Check if the input `node` is definitely immutable.
 */
export default function isImmutable(node: types.Node): boolean {
  if (isType(node.type, "Immutable")) return true;

  if (isIdentifier(node)) {
    if (node.name === "undefined") {
      // immutable!
      return true;
    } else {
      // no idea...
      return false;
    }
  }

  return false;
}
