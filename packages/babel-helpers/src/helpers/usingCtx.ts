/* @minVersion 7.23.9 */

type Stack = {
  v: any;
  d: () => any;
  a: boolean;
};

export default function _usingCtx() {
  var _disposeSuppressedError =
      typeof SuppressedError === "function"
        ? // eslint-disable-next-line no-undef
          SuppressedError
        : (function (error: Error, suppressed: Error) {
            var err = new Error() as SuppressedError;
            err.name = "SuppressedError";
            err.suppressed = suppressed;
            err.error = error;
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
          value[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
      }
      if (dispose == null) {
        dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];
      }
      if (typeof dispose !== "function") {
        throw new TypeError(`Property [Symbol.dispose] is not a function.`);
      }
      stack.push({ v: value, d: dispose, a: isAwait });
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
              disposalResult = resource.d.call(resource.v);
            if (resource.a) {
              return Promise.resolve(disposalResult).then(next, err);
            }
          } catch (e) {
            return err(e);
          }
        }
        if (error !== empty) throw error;
      }

      function err(e: Error) {
        error = error !== empty ? new _disposeSuppressedError(error, e) : e;

        return next();
      }

      return next();
    },
  };
}
