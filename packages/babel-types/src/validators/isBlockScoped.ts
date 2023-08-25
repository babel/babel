import {
  isClassDeclaration,
  isFunctionDeclaration,
} from "./generated/index.ts";
import isLet from "./isLet.ts";
import type * as t from "../index.ts";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: t.Node): boolean {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}
