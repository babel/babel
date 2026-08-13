/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  if (
    Array.isArray(arr) &&
    (typeof Symbol === "undefined" ||
      arr[Symbol.iterator] === Array.prototype[Symbol.iterator])
  ) {
    return arr;
  }
}
