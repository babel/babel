/* @minVersion 7.15.9 */

export default function _asyncIterator(iterable) {
  var method, async, sync;
  if (typeof Symbol !== "undefined") {
    async = Symbol.asyncIterator;
    sync = Symbol.iterator;
  }
  do {
    if (!sync) {
      async = "@@asyncIterator";
      sync = "@@iterator";
    }
    if (async && (method = iterable[async]) != null) {
      return method.call(iterable);
    }
    if ((method = iterable[sync]) != null) {
      return new AsyncFromSyncIterator(method.call(iterable));
    }
  } while (!(sync === "@@iterator" || (sync = null)));
  throw new TypeError("Object is not async iterable");
}

function AsyncFromSyncIterator(s) {
  AsyncFromSyncIterator = function (s) {
    this.s = s;
    this.n = s.next;
  };
  AsyncFromSyncIterator.prototype = {
    /* SyncIterator */ s: null,
    /* SyncIterator.[[Next]] */ n: null,
    next: function () {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    return: function (value) {
      var ret = this.s.return;
      if (ret === undefined) {
        return Promise.resolve({ value: value, done: true });
      }
      return AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    throw: function (value) {
      var thr = this.s.return;
      if (thr === undefined) return Promise.reject(value);
      return AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    },
  };

  function AsyncFromSyncIteratorContinuation(r) {
    // This step is _before_ calling AsyncFromSyncIteratorContinuation in the spec.
    if (Object(r) !== r) {
      return Promise.reject(new TypeError(r + " is not an object."));
    }

    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return { value: value, done: done };
    });
  }

  return new AsyncFromSyncIterator(s);
}
