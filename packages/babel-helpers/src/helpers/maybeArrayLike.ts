/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _maybeArrayLike(next, arr, i) {
  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
    var len = arr.length;
    return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
  }
  return next(arr, i);
}
