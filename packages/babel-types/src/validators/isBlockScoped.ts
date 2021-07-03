import {
  isClassDeclaration,
  isFunctionDeclaration,
  isImportDeclaration,
} from "./generated";
import isLet from "./isLet";
import type * as t from "..";

/**
 * Check if the input `node` is block scoped.
 */
export default function isBlockScoped(node: t.Node): boolean {
  return (
    isFunctionDeclaration(node) ||
    isClassDeclaration(node) ||
    isLet(node) ||
    // import declaration can be block scoped when it's in TS/flow module declaration
    isImportDeclaration(node)
  );
}
