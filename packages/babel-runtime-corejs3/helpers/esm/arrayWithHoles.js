import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
function _arrayWithHoles(r) {
  var t;
  if (_Array$isArray(r) && ("undefined" == typeof _Symbol || (t = _getIteratorMethod(r)) === _getIteratorMethod([])) && (t || !(t = r["@@iterator"]) || t === []["@@iterator"])) return r;
}
export { _arrayWithHoles as default };