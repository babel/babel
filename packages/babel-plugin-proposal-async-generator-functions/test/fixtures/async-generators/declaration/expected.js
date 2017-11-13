let agf =
/*#__PURE__*/
(() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });

  return function agf() {
    return _ref.apply(this, arguments);
  };
})();
