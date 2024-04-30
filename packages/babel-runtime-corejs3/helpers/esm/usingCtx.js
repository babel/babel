import _SuppressedError from "core-js-pure/features/suppressed-error.js";
import _Symbol$asyncDispose from "core-js-pure/features/symbol/async-dispose.js";
import _Symbol$for from "core-js-pure/features/symbol/for.js";
import _Symbol$dispose from "core-js-pure/features/symbol/dispose.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Promise from "core-js-pure/features/promise/index.js";
export default function _usingCtx() {
  var r = "function" == typeof _SuppressedError ? _SuppressedError : function (r, e) {
      var n = Error();
      return n.name = "SuppressedError", n.error = r, n.suppressed = e, n;
    },
    e = {},
    n = [];
  function using(r, e) {
    if (null != e) {
      if (Object(e) !== e) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
      if (r) var o = e[_Symbol$asyncDispose || _Symbol$for("Symbol.asyncDispose")],
        t = 3;
      if (void 0 === o && (o = e[_Symbol$dispose || _Symbol$for("Symbol.dispose")], t &= 2), "function" != typeof o) throw new TypeError("Object is not disposable.");
      _pushInstanceProperty(n).call(n, {
        v: e,
        d: o,
        k: t
      });
    } else r && _pushInstanceProperty(n).call(n, {
      d: e,
      k: 2
    });
    return e;
  }
  return {
    e: e,
    u: _bindInstanceProperty(using).call(using, null, !1),
    a: _bindInstanceProperty(using).call(using, null, !0),
    d: function d() {
      var o = this.e;
      function next() {
        for (; r = n.pop();) try {
          var r,
            t = r.d && r.d.call(r.v);
          if (r.k) return _Promise.resolve(1 & r.k && t).then(next, err);
        } catch (r) {
          return err(r);
        }
        if (o !== e) throw o;
      }
      function err(n) {
        return o = o !== e ? new r(n, o) : n, next();
      }
      return next();
    }
  };
}