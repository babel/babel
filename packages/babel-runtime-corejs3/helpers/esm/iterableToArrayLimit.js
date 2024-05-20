import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
export default function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof _Symbol && _getIteratorMethod(r) || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a,
      f = [],
      o = !1;
    try {
      if (u = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        e = !1;
      } else for (; l < f.length && (e = !0, !(e = (n = u.call(t)).done));) _pushInstanceProperty(f).call(f, n.value);
    } catch (r) {
      o = !0, i = r;
    } finally {
      try {
        if (!e && null != t["return"] && (a = t["return"](), Object(a) !== a)) return;
      } finally {
        if (o) throw i;
      }
    }
    return f;
  }
}