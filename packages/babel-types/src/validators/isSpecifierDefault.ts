import { isIdentifier, isImportDefaultSpecifier } from "./generated";

/**
 * Check if the input `specifier` is a `default` import or export.
 */
export default function isSpecifierDefault(specifier: any): boolean {
  return (
    isImportDefaultSpecifier(specifier) ||
    isIdentifier(specifier.imported || specifier.exported, {
      name: "default",
    })
  );
}
