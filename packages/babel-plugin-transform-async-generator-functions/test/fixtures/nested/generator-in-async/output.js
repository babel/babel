function f() {
  return (f = babelHelpers.asyncToGenerator(function* () {
    yield 1;
    function g() {
      return (g = babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      })).apply(this, arguments);
    }
  })).apply(this, arguments);
}
