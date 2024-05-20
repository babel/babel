/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArray<T>(
  // Note the '@@iterator' property is not recognized here by TypeScript.
  // In fact, it looks like it's used only as the spec name to denote the symbol.
  // We may be able to remove.
  // https://stackoverflow.com/a/29672061/11711383
  // https://262.ecma-international.org/6.0/#sec-well-known-symbols
  iter: Iterable<T>,
) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    (iter as any)["@@iterator"] != null
  ) {
    return Array.from(iter);
  }
}
