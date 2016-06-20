var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call(this));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).whatever;
    return _this;
  }

  return Test;
}(Foo);
