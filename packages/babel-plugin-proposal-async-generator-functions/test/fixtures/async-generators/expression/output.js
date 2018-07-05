function _agf() {
  _agf = babelHelpers.wrapAsyncGenerator(function* agf() {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });
  return _agf.apply(this, arguments);
}

(function agf() {
  return _agf.apply(this, arguments);
});
