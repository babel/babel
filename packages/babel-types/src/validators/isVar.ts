import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";
import type * as t from "..";

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: t.Node): boolean {
  return (
    isVariableDeclaration(node, { kind: "var" }) && !node[BLOCK_SCOPED_SYMBOL]
  );
}
