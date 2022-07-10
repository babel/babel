import { isVariableDeclaration } from "./generated";
import { BLOCK_SCOPED_SYMBOL } from "../constants";
import type * as t from "..";

/**
 * Check if the input `node` is a `let` variable declaration.
 */
export default function isLet(node: t.Node): boolean {
  return (
    isVariableDeclaration(node) &&
    (node.kind !== "var" ||
      // @ts-expect-error Fixme: document private properties
      node[BLOCK_SCOPED_SYMBOL])
  );
}
