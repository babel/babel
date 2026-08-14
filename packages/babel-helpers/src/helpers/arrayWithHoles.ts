/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  if (Array.isArray(arr)) {
    // Array destructuring goes through the iterator protocol, so this fast path is only
    // equivalent when the iterator is the intrinsic one. Array.isArray sees through a
    // Proxy to its array target, and an array can carry its own Symbol.iterator.
    if (
      typeof Symbol === "undefined" ||
      arr[Symbol.iterator] === Array.prototype[Symbol.iterator]
    ) {
      return arr;
    }
  }
}
