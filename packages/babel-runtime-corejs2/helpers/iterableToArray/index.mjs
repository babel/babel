import _Symbol from "@babel/runtime-corejs2/core-js/symbol.js";
import _isIterable from "@babel/runtime-corejs2/core-js/is-iterable.js";
import _Array$from from "@babel/runtime-corejs2/core-js/array/from.js";
export default function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
}