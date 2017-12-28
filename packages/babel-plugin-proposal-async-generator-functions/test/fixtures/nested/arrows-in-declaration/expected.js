function g() {
  return _g.apply(this, arguments);
}

function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* () {
    var _this = this;

    () => this;

    function f() {
      () => this;
    }

    0,
    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      _this;
      yield 1;
    });
    yield babelHelpers.awaitAsyncGenerator(1);
  });
  return _g.apply(this, arguments);
}
