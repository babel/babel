if (test) try {
  var _stack = [];
  const x = babelHelpers.using(_stack, obj);
  doSomethingWith(x);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
