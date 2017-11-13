let g =
/*#__PURE__*/
(() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* (x =
  /*#__PURE__*/
  babelHelpers.asyncToGenerator(function* () {
    yield 1;
  })) {
    yield babelHelpers.awaitAsyncGenerator(2);
    yield 3;
  });

  return function g() {
    return _ref.apply(this, arguments);
  };
})();
