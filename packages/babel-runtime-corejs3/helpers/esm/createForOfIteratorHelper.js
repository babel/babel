import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
function _createForOfIteratorHelper(e, t) {
  var _n = "undefined" != typeof _Symbol && _getIteratorMethod(e) || e["@@iterator"];
  if (!_n) {
    if (_Array$isArray(e) || (_n = unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) {
      _n && (e = _n);
      var o = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return o >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[o++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var a,
    u,
    i = !0;
  return {
    s: function s() {
      _n = _n.call(e);
    },
    n: function n() {
      i = !0;
      var r = _n.next();
      return r.done ? {
        done: !0
      } : {
        value: r.value,
        done: i = !1
      };
    },
    e: function e(r) {
      a = !0, u = r;
    },
    f: function f() {
      try {
        i || null == _n["return"] || _n["return"]();
      } finally {
        if (a) throw u;
      }
    }
  };
}
export { _createForOfIteratorHelper as default };