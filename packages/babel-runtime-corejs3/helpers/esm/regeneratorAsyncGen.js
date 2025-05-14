import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import _Promise from "core-js-pure/features/promise/index.js";
import regenerator from "./regenerator.js";
import OverloadYield from "./OverloadYield.js";
import regeneratorDefine from "./regeneratorDefine.js";
function _regeneratorAsyncGen(e, n, r, t, o) {
  return new function e(n, r) {
    function t(e, o, i, f) {
      try {
        var u = n[e](o),
          a = u.value;
        return a instanceof OverloadYield ? r.resolve(a.v).then(function (e) {
          t("next", e, i, f);
        }, function (e) {
          t("throw", e, i, f);
        }) : r.resolve(a).then(function (e) {
          u.value = e, i(u);
        }, function (e) {
          return t("throw", e, i, f);
        });
      } catch (e) {
        f(e);
      }
    }
    var o;
    this.next || (regeneratorDefine(e.prototype), regeneratorDefine(e.prototype, "function" == typeof _Symbol && _Symbol$asyncIterator || "@asyncIterator", function () {
      return this;
    })), regeneratorDefine(this, "_invoke", function (e, n, i) {
      function f() {
        return new r(function (n, r) {
          t(e, i, n, r);
        });
      }
      return o = o ? o.then(f, f) : f();
    }, !0);
  }(regenerator().w(e, n, r, t), o || _Promise);
}
export { _regeneratorAsyncGen as default };