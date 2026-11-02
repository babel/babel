import {
  isIdentifier,
  isImportDefaultSpecifier,
  isStringLiteral,
} from "./generated/index.ts";
import type * as t from "../index.ts";

/**
 * Check if the input `specifier` is a `default` import or export.
 */
export default function isSpecifierDefault(
  specifier: t.ModuleSpecifier,
): boolean {
  if (isImportDefaultSpecifier(specifier)) return true;

  // @ts-expect-error todo(flow->ts): stricter type for specifier
  const name = specifier.imported || specifier.exported;
  return (
    isIdentifier(name, { name: "default" }) ||
    isStringLiteral(name, { value: "default" })
  );
}
