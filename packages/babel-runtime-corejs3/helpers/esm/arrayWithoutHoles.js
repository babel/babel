import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import arrayLikeToArray from "./arrayLikeToArray.js";
function _arrayWithoutHoles(t) {
  var o;
  if (_Array$isArray(t) && ("undefined" == typeof _Symbol || (o = _getIteratorMethod(t)) === _getIteratorMethod([])) && (o || !(o = t["@@iterator"]) || o === []["@@iterator"])) return arrayLikeToArray(t);
}
export { _arrayWithoutHoles as default };