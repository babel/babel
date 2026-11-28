class A {
  static {
    var _this = this;
    const getName = function () {
      return _this.name;
    };
    const nested = function () {
      return function () {
        return _this.name;
      };
    };
  }
}
