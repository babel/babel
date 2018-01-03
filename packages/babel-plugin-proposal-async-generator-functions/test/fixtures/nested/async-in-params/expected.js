function g() {
  return _g.apply(this, arguments);
}

function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* (x = (0,
  /*#__PURE__*/
  babelHelpers.asyncToGenerator(function* () {
    yield 1;
  }))) {
    yield babelHelpers.awaitAsyncGenerator(2);
    yield 3;
  });
  return _g.apply(this, arguments);
}
