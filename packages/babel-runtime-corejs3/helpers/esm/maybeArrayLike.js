import _Array$isArray from "core-js-pure/features/array/is-array.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _maybeArrayLike(e, a, t) {
  if (a && !_Array$isArray(a) && "number" == typeof a.length) {
    var i = a.length;
    return arrayLikeToArray(a, void 0 !== t && t < i ? t : i);
  }
  return e(a, t);
}
export { _maybeArrayLike as default };