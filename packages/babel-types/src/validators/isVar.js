// @flow
import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: Object): boolean {
  return (
    isVariableDeclaration(node, { kind: "var" }) && !node[BLOCK_SCOPED_SYMBOL]
  );
}
