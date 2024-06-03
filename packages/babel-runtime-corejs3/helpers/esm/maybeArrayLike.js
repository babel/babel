import _Array$isArray from "core-js-pure/features/array/is-array.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _maybeArrayLike(r, a, e) {
  if (a && !_Array$isArray(a) && "number" == typeof a.length) {
    var y = a.length;
    return arrayLikeToArray(a, void 0 !== e && e < y ? e : y);
  }
  return r(a, e);
}
export { _maybeArrayLike as default };