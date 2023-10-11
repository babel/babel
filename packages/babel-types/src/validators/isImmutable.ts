import isType from "./isType.ts";
import { isIdentifier } from "./generated/index.ts";
import type * as t from "../index.ts";

/**
 * Check if the input `node` is definitely immutable.
 */
export default function isImmutable(node: t.Node): boolean {
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
