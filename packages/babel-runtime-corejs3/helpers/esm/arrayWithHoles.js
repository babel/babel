import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
function _arrayWithHoles(r) {
  if (_Array$isArray(r) && ("undefined" == typeof _Symbol || _getIteratorMethod(r) === _getIteratorMethod(Array.prototype))) return r;
}
export { _arrayWithHoles as default };