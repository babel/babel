function _wrapped() {
  _wrapped = babelHelpers.wrapAsyncGenerator(function* () {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });
  return _wrapped.apply(this, arguments);
}

({
  g() {
    return _wrapped.apply(this, arguments);
  }

});
