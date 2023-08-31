import { isVariableDeclaration } from "./generated/index.ts";
import { BLOCK_SCOPED_SYMBOL } from "../constants/index.ts";
import type * as t from "../index.ts";

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: t.Node): boolean {
  return (
    isVariableDeclaration(node, { kind: "var" }) &&
    !(
      // @ts-expect-error document private properties
      node[BLOCK_SCOPED_SYMBOL]
    )
  );
}
