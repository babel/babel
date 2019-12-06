import _Array$from from "../../core-js/array/from.js";
import _isIterable from "../../core-js/is-iterable.js";
export default function _iterableToArray(iter) {
  if (_isIterable(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}