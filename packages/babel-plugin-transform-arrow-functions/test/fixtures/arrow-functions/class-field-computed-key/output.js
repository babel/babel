function f() {
  var _this = this;
  class A {
    static [function () {
      return _this.key;
    }()] = 1;
    [function () {
      return _this.key;
    }()] = 2;
  }
  return A;
}
