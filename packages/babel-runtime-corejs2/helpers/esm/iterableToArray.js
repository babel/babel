import _Symbol from "@babel/runtime-corejs2/core-js/symbol";
import _Symbol$iterator from "@babel/runtime-corejs2/core-js/symbol/iterator";
import _Array$from from "@babel/runtime-corejs2/core-js/array/from";
export default function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && iter[_Symbol$iterator] != null || iter["@@iterator"] != null) return _Array$from(iter);
}