/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArray<T>(iter: Iterable<T>) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    (iter as any)["@@iterator"] != null
  ) {
    return Array.from(iter);
  }
}
