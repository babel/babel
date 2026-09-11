/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  // Protect against arrays (or proxies) with a custom iterator
  if (
    Array.isArray(arr) &&
    (typeof Symbol === "undefined" ||
      arr[Symbol.iterator] === [][Symbol.iterator])
  ) {
    return arr;
  }
}
