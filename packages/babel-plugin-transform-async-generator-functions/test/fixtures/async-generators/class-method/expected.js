class C {
  g() {
    var _this = this;

    return babelHelpers.asyncGenerator.wrap(function* g() {
      _this;
      yield babelHelpers.asyncGenerator.await(1);
      yield 2;
      return 3;
    }).call(this);
  }
}
