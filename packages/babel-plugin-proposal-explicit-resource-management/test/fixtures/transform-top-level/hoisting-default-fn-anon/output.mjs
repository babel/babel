export default function fn() {}
try {
  var _stack = [];
  var x = babelHelpers.using(_stack, null);
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
