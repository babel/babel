function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.asyncToGenerator(function* () {
    yield 0;
    try {
      var _stack = [];
      const x = babelHelpers.using(_stack, y, true);
      yield 1;
    } catch (_) {
      var _error = _;
      var _hasError = true;
    } finally {
      yield babelHelpers.dispose(_stack, _error, _hasError);
    }
  });
  return _fn.apply(this, arguments);
}
