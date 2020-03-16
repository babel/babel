import _Array$from from "../../core-js/array/from";
import _isIterable from "../../core-js/is-iterable";
import _Symbol from "../../core-js/symbol";
export default function _iterableToArray(iter) {
  if (typeof iter === 'string' || Object.prototype.toString.call(iter) === "[object Arguments]" || typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
}