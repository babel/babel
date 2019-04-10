import _isIterable from "../../core-js/is-iterable";
import _Array$from from "../../core-js/array/from";
export default function _iterableToArray(iter) {
  var prototypeWhiteList = [String.prototype, Array.prototype];
  var iterObject = Object(iter);

  if (prototypeWhiteList.some(function (prototype) {
    return prototype.isPrototypeOf(iterObject);
  })) {
    return _Array$from(iter);
  }

  if (iterObject.toString() === "[object Arguments]") {
    return _Array$from(iter);
  }

  if (_isIterable(iterObject)) {
    return _Array$from(iter);
  }
}