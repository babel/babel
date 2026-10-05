import _Symbol from "core-js-pure/features/symbol/index.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import _Symbol$iterator from "core-js-pure/features/symbol/iterator.js";
import _Promise from "core-js-pure/features/promise/index.js";
function _asyncIterator(r) {
  var t,
    n,
    o,
    e = 2;
  for ("undefined" != typeof _Symbol && (n = _Symbol$asyncIterator, o = _Symbol$iterator); e--;) {
    if (n && null != (t = r[n])) return t.call(r);
    if (o && null != (t = r[o])) return new AsyncFromSyncIterator(t.call(r));
    n = "@@asyncIterator", o = "@@iterator";
  }
  throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(r) {
  function AsyncFromSyncIteratorContinuation(r, t) {
    if (Object(r) !== r) return _Promise.reject(new TypeError(r + " is not an object."));
    var n,
      o = r.done,
      e = r.value;
    try {
      n = _Promise.resolve(e);
    } catch (r) {
      n = _Promise.reject(r);
    }
    return n.then(function (r) {
      return {
        value: r,
        done: o
      };
    }, t && !o ? function (r) {
      try {
        var n = t["return"];
        null != n && n.call(t);
      } catch (r) {}
      throw r;
    } : void 0);
  }
  return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) {
    this.s = r, this.n = r.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function next() {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments), this.s);
    },
    "return": function _return(r) {
      var t = this.s["return"];
      return void 0 === t ? _Promise.resolve({
        value: r,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(t.apply(this.s, arguments));
    },
    "throw": function _throw() {
      var r = this.s,
        t = r["throw"];
      return void 0 === t ? new _Promise(function (t, n) {
        var o = r["return"];
        null != o && o.call(r), n(new TypeError("The iterator does not provide a 'throw' method"));
      }) : AsyncFromSyncIteratorContinuation(t.apply(r, arguments), r);
    }
  }, new AsyncFromSyncIterator(r);
}
export { _asyncIterator as default };