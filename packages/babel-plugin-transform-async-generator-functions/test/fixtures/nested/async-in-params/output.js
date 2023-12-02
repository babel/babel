function g() {
  return babelHelpers.callAsyncGenerator(function* (x = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
    yield 1;
  })) {
    yield babelHelpers.awaitAsyncGenerator(2);
    yield 3;
  }, this, arguments);
}
