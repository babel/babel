/* @minVersion 7.23.0 */

function dispose_SuppressedError(suppressed, error) {
  if (typeof SuppressedError !== "undefined") {
    // eslint-disable-next-line no-undef
    dispose_SuppressedError = SuppressedError;
  } else {
    dispose_SuppressedError = function SuppressedError(suppressed, error) {
      this.suppressed = suppressed;
      this.error = error;
      this.stack = new Error().stack;
    };
    dispose_SuppressedError.prototype = Object.create(Error.prototype, {
      constructor: {
        value: dispose_SuppressedError,
        writable: true,
        configurable: true,
      },
    });
  }
  return new dispose_SuppressedError(suppressed, error);
}

export default function _usingCtx() {
  var empty = {};
  return {
    s: [], // stack
    e: empty, // error
    using: function (value, isAwait) {
      if (value === null || value === void 0) return value;
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
      if (dispose === null || dispose === void 0) {
        dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];
      }
      if (typeof dispose !== "function") {
        throw new TypeError(`Property [Symbol.dispose] is not a function.`);
      }
      this.s.push({ v: value, d: dispose, a: isAwait });
      return value;
    },
    dispose: function () {
      var stack = this.s,
        error = this.e;

      function next() {
        while ((r = stack.pop())) {
          try {
            var r,
              p = r.d.call(r.v);
            if (r.a) return Promise.resolve(p).then(next, err);
          } catch (e) {
            return err(e);
          }
        }
        if (error != empty) throw error;
      }

      function err(e) {
        error = error != empty ? new dispose_SuppressedError(e, error) : e;

        return next();
      }

      return next();
    },
  };
}
