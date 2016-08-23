var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    var _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.wrapCtor(Object.getPrototypeOf(Test)).call(this));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).whatever();
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).call(_this);
    return _this;
  }

  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.get(Object.getPrototypeOf(Test), "wow", this).call(this);
    }
  }]);
  return Test;
}(Foo);
