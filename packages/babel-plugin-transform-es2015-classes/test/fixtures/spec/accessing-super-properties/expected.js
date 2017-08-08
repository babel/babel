var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _this;

    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", _this);
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", _this).whatever;
    return _this;
  }

  return Test;
}(Foo);
