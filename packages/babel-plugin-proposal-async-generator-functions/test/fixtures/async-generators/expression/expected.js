(() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });

  function agf() {
    return _ref.apply(this, arguments);
  }

  return agf;
})();
