try {
  var _stack = [];
  const x = babelHelpers.using(_stack, obj, true);
  stmt;
  const y = babelHelpers.using(_stack, obj, true),
    z = babelHelpers.using(_stack, obj, true);
  doSomethingWith(x, y);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  await babelHelpers.dispose(_stack, _error, _hasError);
}
