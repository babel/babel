import _Symbol from "core-js-pure/features/symbol/index.js";
import _getIteratorMethod from "core-js-pure/features/get-iterator-method.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
export default function _iterableToArrayLimit(t, e) {
  var l = null == t ? null : "undefined" != typeof _Symbol && _getIteratorMethod(t) || t["@@iterator"];
  if (null == l) return;
  var r = [];
  var n,
    u,
    i,
    f,
    o = !0,
    a = !1;
  try {
    if (i = (l = l.call(t)).next, 0 === e) {
      if (Object(l) !== l) return;
      o = !1;
    } else for (; !(o = (n = i.call(l)).done) && (_pushInstanceProperty(r).call(r, n.value), r.length !== e); o = !0);
  } catch (t) {
    a = !0, u = t;
  } finally {
    try {
      if (!o && null != l["return"] && (f = l["return"](), Object(f) !== f)) return;
    } finally {
      if (a) throw u;
    }
  }
  return r;
}