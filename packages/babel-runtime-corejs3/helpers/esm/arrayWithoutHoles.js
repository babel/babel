import _Array$isArray from "core-js-pure/features/array/is-array.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
export default function _arrayWithoutHoles(r) {
  if (_Array$isArray(r)) return arrayLikeToArray(r);
}