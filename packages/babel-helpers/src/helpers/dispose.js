/* @minVersion 7.0.0-beta.0 */
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

export default function _dispose(stack, error, hasError) {
  function next() {
    if (stack.length === 0) {
      if (hasError) throw error;
      return;
    }

    var r = stack.pop();
    if (r.a) {
      return Promise.resolve(r.d.call(r.v)).then(next, err);
    }
    try {
      r.d.call(r.v);
    } catch (e) {
      return err(e);
    }
    return next();
  }

  function err(e) {
    error = hasError ? new dispose_SuppressedError(e, error) : e;
    hasError = true;

    return next();
  }

  return next();
}
