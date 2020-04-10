import { isIdentifier, isImportDefaultSpecifier } from "./generated";
import type * as types from "../types";

/**
 * Check if the input `specifier` is a `default` import or export.
 */
export default function isSpecifierDefault(
  specifier: types.ModuleSpecifier,
): boolean {
  return (
    isImportDefaultSpecifier(specifier) ||
    // @ts-ignore
    isIdentifier(specifier.imported || specifier.exported, {
      name: "default",
    })
  );
}
