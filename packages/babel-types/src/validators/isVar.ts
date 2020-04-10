import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";
import type * as types from "../types";

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: types.Node): boolean {
  return (
    isVariableDeclaration(node, { kind: "var" }) && !node[BLOCK_SCOPED_SYMBOL]
  );
}
