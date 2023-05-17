/* @minVersion 7.0.0-beta.0 */
function dispose_SuppressedError(suppressed, error) {
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
  return new dispose_SuppressedError(suppressed, error);
}

export default function _dispose(stack, error, hasError, SuppressedError) {
  while (stack.length > 0) {
    const r = stack.pop();
    try {
      r.d.call(r.v);
    } catch (e) {
      error = hasError
        ? new (SuppressedError || dispose_SuppressedError)(e, error)
        : e;
      hasError = true;
    }
  }
  if (hasError) throw error;
}
