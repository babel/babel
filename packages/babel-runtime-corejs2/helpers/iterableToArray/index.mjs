import _Array$from from "@babel/runtime-corejs2/core-js/array/from";
import _isIterable from "@babel/runtime-corejs2/core-js/is-iterable";
import _Symbol from "@babel/runtime-corejs2/core-js/symbol";
export default function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
}