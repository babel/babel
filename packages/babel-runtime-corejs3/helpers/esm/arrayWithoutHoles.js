import _Array$isArray from "core-js-pure/features/array/is-array.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _arrayWithoutHoles(r) {
  if (_Array$isArray(r)) return arrayLikeToArray(r);
}
export { _arrayWithoutHoles as default };