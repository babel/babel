for (const _x of y) try {
  var _stack = [];
  const x = babelHelpers.using(_stack, _x);
  doSomethingWith(x);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
