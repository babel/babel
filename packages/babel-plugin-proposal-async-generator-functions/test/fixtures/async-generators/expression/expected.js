0,
/*#__PURE__*/
function () {
  var _agf = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });

  return function agf() {
    return _agf.apply(this, arguments);
  };
}();
