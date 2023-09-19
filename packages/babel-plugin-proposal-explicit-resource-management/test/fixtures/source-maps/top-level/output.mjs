try {
  var _stack = [];
  before;
  var x = babelHelpers.using(_stack, fn());
  doSomethingWith(x);
  after;
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
