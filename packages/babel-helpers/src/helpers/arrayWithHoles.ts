/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  // Only take the fast path for arrays that iterate with the default array
  // iterator: Array.isArray pierces Proxies, so an array-backed Proxy with a
  // custom Symbol.iterator must fall through to the iterator-based helpers
  // to match native destructuring semantics. (#18181)
  if (
    Array.isArray(arr) &&
    (typeof Symbol === "undefined" ||
      arr[Symbol.iterator] === Array.prototype[Symbol.iterator])
  ) {
    return arr;
  }
}
