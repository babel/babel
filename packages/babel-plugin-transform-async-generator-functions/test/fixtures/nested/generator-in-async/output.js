var _ref2;
function f() {
  return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* () {
    var _ref;
    yield 1;
    function g() {
      return (_ref = _ref || babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
