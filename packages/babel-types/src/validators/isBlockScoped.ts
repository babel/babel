import { isClassDeclaration, isFunctionDeclaration } from "./generated";
import isLet from "./isLet";
import type * as types from "../types";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: types.Node): boolean {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}
