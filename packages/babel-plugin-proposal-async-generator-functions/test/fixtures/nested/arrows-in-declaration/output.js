function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* g() {
    var _this = this;

    () => this;

    function f() {
      () => this;
    }

    function _wrapped() {
      _wrapped = babelHelpers.asyncToGenerator(function* () {
        _this;
        yield 1;
      });
      return _wrapped.apply(this, arguments);
    }

    (function () {
      return _wrapped.apply(this, arguments);
    });

    yield babelHelpers.awaitAsyncGenerator(1);
  });
  return _g.apply(this, arguments);
}

function g() {
  return _g.apply(this, arguments);
}
