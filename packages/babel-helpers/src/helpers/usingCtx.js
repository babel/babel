/* @minVersion 7.23.0 */

var disposeSuppressedError2;

export default function _usingCtx() {
  if (!disposeSuppressedError2) {
    if (typeof SuppressedError !== "undefined") {
      // eslint-disable-next-line no-undef
      disposeSuppressedError2 = SuppressedError;
    } else {
      disposeSuppressedError2 = function SuppressedError(suppressed, error) {
        this.suppressed = suppressed;
        this.error = error;
        this.stack = new Error().stack;
      };
      Object.setPrototypeOf(disposeSuppressedError2.prototype, Error.prototype);
    }
  }

  var empty = {},
    stack = [];
  function using(isAwait, value) {
    if (value != null) {
      if (typeof value !== "object") {
        throw new TypeError(
          "using declarations can only be used with objects, null, or undefined."
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

      function next() {
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

      function err(e) {
        error = error !== empty ? new disposeSuppressedError2(e, error) : e;

        return next();
      }

      return next();
    },
  };
}
