class A {
  static f = (() => {
    var _this = this;
    return babelHelpers.asyncToGenerator(function* () {
      return _this.name;
    });
  })();
  static {
    var _this2 = this;
    this.g = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
      return _this2.name;
    });
  }
}
