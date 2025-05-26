import _typeof from "./typeof.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$iterator from "core-js-pure/features/symbol/iterator.js";
function _regeneratorValues(e) {
  if (null != e) {
    var r = e["function" == typeof _Symbol && _Symbol$iterator || "@@iterator"];
    if (r) return r.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) {
      var t = -1,
        n = function r() {
          for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r;
          return r.value = void 0, r.done = !0, r;
        };
      return n.next = n;
    }
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
export { _regeneratorValues as default };