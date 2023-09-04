var _f;
function f() {
  return (_f = _f || babelHelpers.asyncToGenerator(function* () {
    var _g;
    yield 1;
    function g() {
      return (_g = _g || babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
