/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  ) {
    return Array.from(iter);
  }
}
