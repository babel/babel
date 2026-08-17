/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArray<T>(iter: Iterable<T>) {
  // no == null check: reading the property of null/undefined must throw,
  // like it does when spreading them
  var iterator =
    (typeof Symbol !== "undefined" && iter[Symbol.iterator]) ||
    (iter as any)["@@iterator"];
  // fast path, but not for arrays (or proxies) with a custom iterator
  if (
    Array.isArray(iter) &&
    (iterator == null ||
      iterator ===
        (typeof Symbol !== "undefined" && Array.prototype[Symbol.iterator]))
  ) {
    return iter as T[];
  }
  if (iterator == null) return;
  // don't use Array.from, it would read the iterator a second time
  var arr: T[] = [];
  for (var it = iterator.call(iter), step; !(step = it.next()).done;) {
    arr.push(step.value);
  }
  return arr;
}
