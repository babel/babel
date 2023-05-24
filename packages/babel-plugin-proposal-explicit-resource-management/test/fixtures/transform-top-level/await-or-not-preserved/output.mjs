export { x, y };
try {
  var _stack = [];
  var x = babelHelpers.using(_stack, A);
  var y = babelHelpers.using(_stack, B, true);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  await babelHelpers.dispose(_stack, _error, _hasError);
}
