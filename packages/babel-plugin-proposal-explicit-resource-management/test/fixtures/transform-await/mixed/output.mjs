try {
  var _stack = [];
  const a = babelHelpers.using(_stack, 1);
  const b = babelHelpers.using(_stack, 2, true);
  const c = babelHelpers.using(_stack, 3);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  await babelHelpers.dispose(_stack, _error, _hasError);
}
