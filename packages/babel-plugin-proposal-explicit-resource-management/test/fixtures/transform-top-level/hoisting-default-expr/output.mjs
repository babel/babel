export { _default as default };
try {
  var _stack = [];
  var x = babelHelpers.using(_stack, null);
  var _default = doSomething();
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
