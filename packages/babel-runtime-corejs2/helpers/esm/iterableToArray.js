import _Symbol from "core-js/library/fn/symbol/index.js";
import _Symbol$iterator from "core-js/library/fn/symbol/iterator.js";
import _Array$from from "core-js/library/fn/array/from.js";
export default function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && iter[_Symbol$iterator] != null || iter["@@iterator"] != null) return _Array$from(iter);
}