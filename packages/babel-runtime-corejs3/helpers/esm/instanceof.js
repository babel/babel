import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$hasInstance from "core-js-pure/features/symbol/has-instance.js";
function _instanceof(n, e) {
  return null != e && "undefined" != typeof _Symbol && e[_Symbol$hasInstance] ? !!e[_Symbol$hasInstance](n) : n instanceof e;
}
export { _instanceof as default };