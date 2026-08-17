import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
function _iterableToArrayLimit(r, t) {
  var e = null == r ? null : "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"];
  if (_Array$isArray(r) && (null == e || e === ("undefined" != typeof _Symbol && _getIteratorMethod(Array.prototype)))) return r;
  if (null != e) {
    var l,
      n,
      i,
      a,
      o = [],
      u = !0,
      f = !1;
    try {
      if (i = (e = e.call(r)).next, 0 === t) {
        if (Object(e) !== e) return;
        u = !1;
      } else for (; !(u = (l = i.call(e)).done) && (_pushInstanceProperty(o).call(o, l.value), o.length !== t); u = !0);
    } catch (r) {
      f = !0, n = r;
    } finally {
      try {
        if (!u && null != e["return"] && (a = e["return"](), Object(a) !== a)) return;
      } finally {
        if (f) throw n;
      }
    }
    return o;
  }
}
export { _iterableToArrayLimit as default };