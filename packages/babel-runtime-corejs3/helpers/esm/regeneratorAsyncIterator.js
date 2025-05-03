import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import OverloadYield from "./OverloadYield.js";
import regeneratorDefine from "./regeneratorDefine.js";
import tryCatch from "./tryCatch.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
function AsyncIterator(t, e) {
  function r(n, o, i, f) {
    var a = tryCatch(t[n], t, o);
    if (!a.e) {
      var c = a.v,
        u = c.value;
      return u && u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        r("next", t, i, f);
      }, function (t) {
        r("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return r("throw", t, i, f);
      });
    }
    f(a.v);
  }
  var n;
  this.next || (regeneratorDefineIM(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof _Symbol && _Symbol$asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, n) {
        r(t, i, e, n);
      });
    }
    return n = n ? n.then(f, f) : f();
  }, !0);
}
export { AsyncIterator as default };