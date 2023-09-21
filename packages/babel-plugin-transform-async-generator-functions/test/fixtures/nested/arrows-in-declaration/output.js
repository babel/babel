function g() {
  return babelHelpers.callAsyncGenerator(function* () {
    var _this = this;
    () => this;
    function f() {
      () => this;
    }
    /*#__PURE__*/babelHelpers.asyncToGenerator2(function* () {
      _this;
      yield 1;
    });
    yield babelHelpers.awaitAsyncGenerator(1);
  }, this, arguments);
}
