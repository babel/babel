import { isClassDeclaration, isFunctionDeclaration } from "./generated";
import isLet from "./isLet";
import type * as t from "..";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: t.Node): boolean {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}
