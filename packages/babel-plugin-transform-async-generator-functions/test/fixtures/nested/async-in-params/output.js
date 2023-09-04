var _ref;
function g() {
  return (_ref = _ref || babelHelpers.wrapAsyncGenerator(function* (x = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
    yield 1;
  })) {
    yield babelHelpers.awaitAsyncGenerator(2);
    yield 3;
  })).apply(this, arguments);
}
