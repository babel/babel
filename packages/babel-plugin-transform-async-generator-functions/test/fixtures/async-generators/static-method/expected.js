class C {
  static g() {
    var _this = this;

    return babelHelpers.wrapAsyncGenerator(function* () {
      _this;
      yield babelHelpers.awaitAsyncGenerator(1);
      yield 2;
      return 3;
    })();
  }

}
