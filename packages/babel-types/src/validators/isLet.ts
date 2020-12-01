// @flow
import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";

/**
 * Check if the input `node` is a `let` variable declaration.
 */
export default function isLet(node: Object): boolean {
  return (
    isVariableDeclaration(node) &&
    (node.kind !== "var" || node[BLOCK_SCOPED_SYMBOL])
  );
}
