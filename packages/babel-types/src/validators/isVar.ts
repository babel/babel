import { isVariableDeclaration } from "./generated/index.ts";
import type * as t from "../index.ts";

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: t.Node | null | undefined): boolean {
  return isVariableDeclaration(node) && node.kind === "var";
}
