function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    yield 1;
  });
  return _wrapped.apply(this, arguments);
}

function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* g(x = function () {
    return _wrapped.apply(this, arguments);
  }) {
    yield babelHelpers.awaitAsyncGenerator(2);
    yield 3;
  });
  return _g.apply(this, arguments);
}

function g() {
  return _g.apply(this, arguments);
}
