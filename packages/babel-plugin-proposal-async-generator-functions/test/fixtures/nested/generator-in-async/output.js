function f() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = babelHelpers.asyncToGenerator(function* () {
    yield 1;

    function g() {
      return _g.apply(this, arguments);
    }

    function _g() {
      _g = babelHelpers.wrapAsyncGenerator(function* () {
        yield babelHelpers.awaitAsyncGenerator(2);
        yield 3;
      });
      return _g.apply(this, arguments);
    }
  });
  return _f.apply(this, arguments);
}
