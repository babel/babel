import _Array$from from "../../core-js/array/from";
import _Set from "../../core-js/set";
import _Map from "../../core-js/map";
import _isIterable from "../../core-js/is-iterable";
import _Symbol from "../../core-js/symbol";
import _Array$isArray from "../../core-js/array/is-array";
export default function _iterableToArray(iter) {
  if (_Array$isArray(iter) || typeof iter === 'string' || typeof _Symbol === 'function' && _isIterable(Object(iter)) || iter && 'length' in iter || typeof _Map !== 'undefined' && iter instanceof _Map || typeof _Set !== 'undefined' && iter instanceof _Set || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}