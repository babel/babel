import _isIterable from "../../core-js/is-iterable";
import _Array$from from "../../core-js/array/from";
export default function _iterableToArray(iter) {
  if (typeof iter === 'string') {
    return _Array$from(iter);
  }

  if (Object.prototype.toString.call(iter) === "[object Arguments]") {
    return _Array$from(iter);
  }

  if (_isIterable(Object(iter))) {
    return _Array$from(iter);
  }
}