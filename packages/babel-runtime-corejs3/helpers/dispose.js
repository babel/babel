var _SuppressedError = require("core-js-pure/features/suppressed-error.js");
var _Object$create = require("core-js-pure/features/object/create.js");
var _Promise = require("core-js-pure/features/promise/index.js");
function dispose_SuppressedError(suppressed, error) {
  return "undefined" != typeof _SuppressedError ? dispose_SuppressedError = _SuppressedError : (dispose_SuppressedError = function dispose_SuppressedError(suppressed, error) {
    this.suppressed = suppressed, this.error = error, this.stack = new Error().stack;
  }, dispose_SuppressedError.prototype = _Object$create(Error.prototype, {
    constructor: {
      value: dispose_SuppressedError,
      writable: !0,
      configurable: !0
    }
  })), new dispose_SuppressedError(suppressed, error);
}
function _dispose(stack, error, hasError) {
  function next() {
    for (; stack.length > 0;) {
      var r = stack.pop();
      try {
        var p = r.d.call(r.v);
        if (r.a) return _Promise.resolve(p).then(next, err);
      } catch (e) {
        return err(e);
      }
    }
    if (hasError) throw error;
  }
  function err(e) {
    return error = hasError ? new dispose_SuppressedError(e, error) : e, hasError = !0, next();
  }
  return next();
}
module.exports = _dispose, module.exports.__esModule = true, module.exports["default"] = module.exports;