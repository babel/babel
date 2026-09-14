/* @minVersion 7.0.0-beta.0 */

export default function _arrayWithHoles<T>(arr: T[]) {
  // Protect against arrays (or proxies) with a custom iterator
  var arrayIterator;
  if (!Array.isArray(arr)) return;
  if (typeof Symbol !== "undefined") {
    arrayIterator = arr[Symbol.iterator];
    if (arrayIterator !== [][Symbol.iterator]) return;
  }
  if (!arrayIterator) {
    arrayIterator = arr["@@iterator"];
    if (arrayIterator && arrayIterator !== []["@@iterator"]) return;
  }
  return arr;
}
