/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArrayLimitLoose<T>(
  arr: Iterable<T>,
  i: number,
) {
  var iterator: Iterator<T> & Function =
    arr &&
    ((typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
      (arr as any)["@@iterator"]);
  if (iterator == null) return;

  var _arr: T[] = [];
  var step;
  iterator = iterator.call(arr);
  while (arr.length < i && !(step = iterator.next()).done) {
    _arr.push(step.value);
  }
  return _arr;
}
