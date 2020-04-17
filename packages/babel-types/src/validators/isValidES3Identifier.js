// @flow
import isValidIdentifier from "./isValidIdentifier";

const RESERVED_WORDS_ES3_ONLY: Set<string> = new Set([
  "abstract",
  "boolean",
  "byte",
  "char",
  "double",
  "enum",
  "final",
  "float",
  "goto",
  "implements",
  "int",
  "interface",
  "long",
  "native",
  "package",
  "private",
  "protected",
  "public",
  "short",
  "static",
  "synchronized",
  "throws",
  "transient",
  "volatile",
]);

/**
 * Check if the input `name` is a valid identifier name according to the ES3 specification.
 *
 * Additional ES3 reserved words are
 */
export default function isValidES3Identifier(name: string): boolean {
  return isValidIdentifier(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
}
