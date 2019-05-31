// @flow
import { isClassDeclaration } from "./generated";
import isLet from "./isLet";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: Object): boolean {
  return isClassDeclaration(node) || isLet(node);
}
