function agf() {
  return _agf.apply(this, arguments);
}

function _agf() {
  _agf = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });
  return _agf.apply(this, arguments);
}
