try {
  var _stack = [];
  const x = babelHelpers.using(_stack, obj);
  try {
    var _stack2 = [];
    const y = babelHelpers.using(_stack2, call(() => {
      try {
        var _stack3 = [];
        const z = babelHelpers.using(_stack3, obj);
        return z;
      } catch (_) {
        var _error3 = _;
        var _hasError3 = true;
      } finally {
        babelHelpers.dispose(_stack3, _error3, _hasError3);
      }
    }));
    stmt;
  } catch (_) {
    var _error2 = _;
    var _hasError2 = true;
  } finally {
    babelHelpers.dispose(_stack2, _error2, _hasError2);
  }
  stmt;
} catch (_) {
  var _error = _;
  var _hasError = true;
} finally {
  babelHelpers.dispose(_stack, _error, _hasError);
}
