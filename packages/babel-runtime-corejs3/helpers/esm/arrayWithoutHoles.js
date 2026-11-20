import _Array$isArray from "core-js-pure/features/array/is-array.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _arrayWithoutHoles(a) {
  if (_Array$isArray(a)) return arrayLikeToArray(a);
}
export { _arrayWithoutHoles as default };