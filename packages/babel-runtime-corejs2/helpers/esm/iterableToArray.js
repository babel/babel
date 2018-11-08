import _Array$from from "../../core-js/array/from";
import _isIterable from "../../core-js/is-iterable";
import _Array$isArray from "../../core-js/array/is-array";
export default function _iterableToArray(iter) {
  if (_Array$isArray(iter) || typeof iter === 'string' || typeof global.Symbol === 'function' && _isIterable(Object(iter)) || iter && 'length' in iter || typeof global.Map !== 'undefined' && iter instanceof global.Map || typeof global.Set !== 'undefined' && iter instanceof global.Set || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}