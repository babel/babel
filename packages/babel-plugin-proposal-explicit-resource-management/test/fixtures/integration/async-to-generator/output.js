var _ref;
function fn() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
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
  })).apply(this, arguments);
}
