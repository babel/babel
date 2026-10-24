import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import OverloadYield from "./OverloadYield.js";
import regeneratorDefine from "./regeneratorDefine.js";
function AsyncIterator(r, e) {
  function o(n, i, c, u) {
    try {
      var f = r[n](i),
        a = f.value;
      return a instanceof OverloadYield ? e.resolve(a.v).then(function (t) {
        o("next", t, c, u);
      }, function (t) {
        o("throw", t, c, u);
      }) : e.resolve(a).then(function (t) {
        f.value = t, c(f);
      }, function (t) {
        return o("throw", t, c, u);
      });
    } catch (t) {
      u(t);
    }
  }
  var i;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof _Symbol && _Symbol$asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, n, r) {
    function c() {
      return new e(function (n, e) {
        o(t, r, n, e);
      });
    }
    return i = i ? i.then(c, c) : c();
  }, !0);
}
export { AsyncIterator as default };