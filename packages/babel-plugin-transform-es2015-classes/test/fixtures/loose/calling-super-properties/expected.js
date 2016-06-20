var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call(this));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).whatever();
    _Foo.prototype.test.call(_this);
    return _this;
  }

  Test.test = function test() {
    return _Foo.wow.call(this);
  };

  return Test;
}(Foo);
