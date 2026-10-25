import _Promise from "core-js-pure/features/promise/index.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import OverloadYield from "./OverloadYield.js";
function _wrapAsyncGenerator(e) {
  return function () {
    return new AsyncGenerator(e.apply(this, arguments));
  };
}
function AsyncGenerator(t) {
  var n, r;
  function resume(n, r) {
    try {
      var o = t[n](r),
        u = o.value,
        i = u instanceof OverloadYield;
      _Promise.resolve(i ? u.v : u).then(function (e) {
        if (i) {
          var r = "return" === n && u.k ? n : "next";
          if (!u.k || e.done) return resume(r, e);
          e = t[r](e).value;
        }
        settle(!!o.done, e);
      }, function (e) {
        resume("throw", e);
      });
    } catch (e) {
      settle(2, e);
    }
  }
  function settle(e, t) {
    2 === e ? n.reject(t) : n.resolve({
      value: t,
      done: e
    }), (n = n.next) ? resume(n.key, n.arg) : r = null;
  }
  this._invoke = function (e, t) {
    return new _Promise(function (o, u) {
      var i = {
        key: e,
        arg: t,
        resolve: o,
        reject: u,
        next: null
      };
      r ? r = r.next = i : (n = r = i, resume(e, t));
    });
  }, "function" != typeof t["return"] && (this["return"] = void 0);
}
AsyncGenerator.prototype["function" == typeof _Symbol && _Symbol$asyncIterator || "@@asyncIterator"] = function () {
  return this;
}, AsyncGenerator.prototype.next = function (e) {
  return this._invoke("next", e);
}, AsyncGenerator.prototype["throw"] = function (e) {
  return this._invoke("throw", e);
}, AsyncGenerator.prototype["return"] = function (e) {
  return this._invoke("return", e);
};
export { _wrapAsyncGenerator as default };