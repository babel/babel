/*#__PURE__*/
(function () {
  var _agf = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });

  function agf() {
    return _agf.apply(this, arguments);
  }

  return agf;
})();
