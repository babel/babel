/* @minVersion 7.22.0 */
/* @onlyBabel7 */

function dispose_SuppressedError(error, suppressed) {
  if (typeof SuppressedError !== "undefined") {
    dispose_SuppressedError = SuppressedError;
  } else {
    dispose_SuppressedError = function SuppressedError(error, suppressed) {
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
  return new dispose_SuppressedError(error, suppressed);
}

export default function _dispose(stack, error, hasError) {
  function next() {
    while (stack.length > 0) {
      try {
        var r = stack.pop();
        var p = r.d.call(r.v);
        if (r.a) return Promise.resolve(p).then(next, err);
      } catch (e) {
        return err(e);
      }
    }
    if (hasError) throw error;
  }

  function err(e) {
    error = hasError ? new dispose_SuppressedError(error, e) : e;
    hasError = true;

    return next();
  }

  return next();
}
