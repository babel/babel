function _g() {
  _g = babelHelpers.wrapAsyncGenerator(function* g() {
    this;
    yield babelHelpers.awaitAsyncGenerator(1);
    yield 2;
    return 3;
  });
  return _g.apply(this, arguments);
}

class C {
  static g() {
    return _g.apply(this, arguments);
  }

}
