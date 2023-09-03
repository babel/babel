function agf() {
  return (agf = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  })).apply(this, arguments);
}
