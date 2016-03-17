var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call(this));

    _Foo.prototype.test.whatever();
    _Foo.prototype.test.call(_this);
    return _this;
  }

  Test.test = function test() {
    return _Foo.wow.call(this);
  };

  return Test;
}(Foo);
