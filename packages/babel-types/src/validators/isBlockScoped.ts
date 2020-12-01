// @flow
import { isClassDeclaration, isFunctionDeclaration } from "./generated";
import isLet from "./isLet";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: Object): boolean {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}
