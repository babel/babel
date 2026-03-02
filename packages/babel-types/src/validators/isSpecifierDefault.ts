import { isIdentifier, isImportDefaultSpecifier } from "./generated";
import type * as t from "..";

/**
 * Check if the input `specifier` is a `default` import or export.
 */
export default function isSpecifierDefault(
  specifier: t.ModuleSpecifier,
): boolean {
  return (
    isImportDefaultSpecifier(specifier) ||
    // @ts-expect-error todo(flow->ts): stricter type for specifier
    isIdentifier(specifier.imported || specifier.exported, {
      name: "default",
    })
  );
}
