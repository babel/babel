// @flow
import esutils from "esutils";

/**
 * Check if the input `name` is a valid identifier name.
 */
export default function isIdentifierName(name: string): boolean {
  return esutils.keyword.isIdentifierNameES6(name);
}
