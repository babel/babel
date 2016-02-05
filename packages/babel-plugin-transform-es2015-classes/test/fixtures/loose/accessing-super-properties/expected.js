var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    var _this = babelHelpers.possibleConstructorReturn(this, _Foo.call(this));

    _Foo.prototype.test;
    _Foo.prototype.test.whatever;
    return _this;
  }

  return Test;
}(Foo);
