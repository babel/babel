/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _maybeArrayLike<T>(
  next: (arr: any, i: number) => any,
  arr: any,
  i: number,
) {
  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
    var len = arr.length;
    return arrayLikeToArray<T>(arr, i !== void 0 && i < len ? i : len);
  }
  return next(arr, i);
}
