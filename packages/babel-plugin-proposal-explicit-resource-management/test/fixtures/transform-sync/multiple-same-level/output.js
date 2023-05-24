try {
  var _stack = [];
  stmt;
  const x = babelHelpers.using(_stack, obj);
  stmt;
  const y = babelHelpers.using(_stack, obj),
    z = babelHelpers.using(_stack, obj);
  stmt;
  const w = babelHelpers.using(_stack, obj);
  doSomethingWith(x, z);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
