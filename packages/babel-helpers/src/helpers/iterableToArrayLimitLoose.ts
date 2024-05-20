/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArrayLimitLoose<T>(
  arr: Array<T>,
  i: number,
) {
  let iterator: Iterator<T> & Function =
    arr &&
    ((typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
      (arr as any)["@@iterator"]);
  if (iterator == null) return;

  const _arr: T[] = [];
  let step;
  for (
    iterator = iterator.call(arr);
    arr.length < i && !(step = iterator.next()).done;

  ) {
    _arr.push(step.value);
  }
  return _arr;
}
