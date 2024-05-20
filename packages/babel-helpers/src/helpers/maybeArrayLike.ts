/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _maybeArrayLike<T>(
  orElse: (arr: any, i: number) => T[] | undefined,
  arr: ArrayLike<T>,
  i: number,
) {
  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
    var len = arr.length;
    return arrayLikeToArray<T>(arr, i !== void 0 && i < len ? i : len);
  }
  return orElse(arr, i);
}
