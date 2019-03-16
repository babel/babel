import _Array$from from "../../core-js/array/from";
import _isIterable from "../../core-js/is-iterable";
export default function _iterableToArray(iter) {
  var prototypeWhiteList = ['[object Arguments]'];
  var hasSymbol = false;

  try {
    if (_isIterable(Object(iter))) {
      hasSymbol = true;
    }
  } catch (e) {}

  if (hasSymbol) {
    return _Array$from(iter);
  }

  if (prototypeWhiteList.indexOf(Object.prototype.toString.call(iter)) !== -1) {
    return _Array$from(iter);
  }

  return null;
}