import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";
import type * as types from "../types";

/**
 * Check if the input `node` is a `let` variable declaration.
 */
export default function isLet(node: types.Node): boolean {
  return (
    isVariableDeclaration(node) &&
    (node.kind !== "var" || node[BLOCK_SCOPED_SYMBOL])
  );
}
