/* @minVersion 7.23.9 */

const enum DisposeFlag {
  // set when the dispose function is a [Symbol.asyncDispose] method
  ASYNC_FLAG = 1,
  // alias of AWAIT_FLAG: set when the resource is an `await using` disposable
  ASYNC_MASK = 2,
}

const enum DisposeKind {
  SYNC = 0,
  // AWAIT_FLAG
  AWAIT_SYNC = 2,
  // AWAIT_FLAG | ASYNC_FLAG
  AWAIT_ASYNC = 3,
}

type Stack = {
  v?: any;
  d: null | undefined | (() => any);
  k: DisposeKind;
};

export default function _usingCtx() {
  var _disposeSuppressedError =
      typeof SuppressedError === "function"
        ? // eslint-disable-next-line no-undef
          SuppressedError
        : (function (error: Error, suppressed: Error) {
            var err = new Error() as SuppressedError;
            err.name = "SuppressedError";
            err.error = error;
            err.suppressed = suppressed;
            return err;
          } as SuppressedErrorConstructor),
    empty = {},
    stack: Stack[] = [];
  function using(isAwait: boolean, value: any) {
    if (value != null) {
      if (Object(value) !== value) {
        throw new TypeError(
          "using declarations can only be used with objects, functions, null, or undefined.",
        );
      }
      // core-js-pure uses Symbol.for for polyfilling well-known symbols
      if (isAwait) {
        var dispose =
            value[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")],
          kind = DisposeKind.AWAIT_ASYNC;
      }
      if (dispose === undefined) {
        dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];
        kind &= DisposeFlag.ASYNC_MASK;
      }
      if (typeof dispose !== "function") {
        throw new TypeError("Object is not disposable.");
      }
      stack.push({ v: value, d: dispose, k: kind });
    } else if (isAwait) {
      // provide the nullish `value` as `d` for minification gain
      stack.push({ d: value, k: DisposeKind.AWAIT_SYNC });
    }
    return value;
  }
  return {
    // error
    e: empty,
    // using
    u: using.bind(null, false),
    // await using
    a: using.bind(null, true),
    // dispose
    d: function () {
      var error = this.e;

      function next(): any {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        while ((resource = stack.pop())) {
          try {
            var resource,
              disposalResult = resource.d && resource.d.call(resource.v);
            if (resource.k) {
              return Promise.resolve(
                // do not await the promise returned from the sync @@dispose
                resource.k & DisposeFlag.ASYNC_FLAG && disposalResult,
              ).then(next, err);
            }
          } catch (e) {
            return err(e);
          }
        }
        if (error !== empty) throw error;
      }

      function err(e: Error) {
        error = error !== empty ? new _disposeSuppressedError(e, error) : e;

        return next();
      }

      return next();
    },
  };
}
