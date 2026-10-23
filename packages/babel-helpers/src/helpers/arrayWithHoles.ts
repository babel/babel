/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  // Array destructuring uses the iterator protocol, not indexing. `Array.isArray`
  // pierces Proxies (returning true for an array-backed Proxy) even when the
  // Proxy overrides `Symbol.iterator`, so only fast-path plain arrays whose
  // iterator is the default `Array.prototype[Symbol.iterator]`.
  if (Array.isArray(arr) && arr[Symbol.iterator] === Array.prototype[Symbol.iterator]) return arr;
}
