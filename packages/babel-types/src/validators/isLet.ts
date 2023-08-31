import { isVariableDeclaration } from "./generated/index.ts";
import { BLOCK_SCOPED_SYMBOL } from "../constants/index.ts";
import type * as t from "../index.ts";

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
