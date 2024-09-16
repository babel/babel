import _Promise from "core-js-pure/features/promise/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import OverloadYield from "./OverloadYield.js";
function _wrapAsyncGenerator(e) {
  return function () {
    return new AsyncGenerator(e.apply(this, arguments));
  };
}
function AsyncGenerator(e) {
  var t, r;
  function resume(t, r) {
    try {
      var n = e[t](r),
        o = n.value,
        c = o instanceof OverloadYield;
      _Promise.resolve(c ? o.v : o).then(function (r) {
        if (c) {
          var a = "return" === t ? "return" : "next";
          if (!o.k || r.done) return resume(a, r);
          r = e[a](r).value;
        }
        settle(n.done ? "return" : "normal", r);
      }, function (e) {
        resume("throw", e);
      });
    } catch (e) {
      settle("throw", e);
    }
  }
  function settle(e, n) {
    switch (e) {
      case "return":
        t.resolve({
          value: n,
          done: !0
        });
        break;
      case "throw":
        t.reject(n);
        break;
      default:
        t.resolve({
          value: n,
          done: !1
        });
    }
    (t = t.next) ? resume(t.key, t.arg) : r = null;
  }
  this._invoke = function (e, n) {
    return new _Promise(function (o, c) {
      var a = {
        key: e,
        arg: n,
        resolve: o,
        reject: c,
        next: null
      };
      r ? r = r.next = a : (t = r = a, resume(e, n));
    });
  }, "function" != typeof e["return"] && (this["return"] = void 0);
}
var AsyncIteratorPrototype = {},
  AsyncGeneratorPrototype = _Object$create(AsyncIteratorPrototype),
  AsyncGeneratorInstanceProrotype = _Object$create(AsyncGeneratorPrototype);
AsyncGenerator.prototype = AsyncGeneratorInstanceProrotype, AsyncGeneratorPrototype.constructor = AsyncGenerator, AsyncIteratorPrototype["function" == typeof _Symbol && _Symbol$asyncIterator || "@@asyncIterator"] = function () {
  return this;
}, AsyncGenerator.prototype.next = function (e) {
  return this._invoke("next", e);
}, AsyncGenerator.prototype["throw"] = function (e) {
  return this._invoke("throw", e);
}, AsyncGenerator.prototype["return"] = function (e) {
  return this._invoke("return", e);
};
export { _wrapAsyncGenerator as default };