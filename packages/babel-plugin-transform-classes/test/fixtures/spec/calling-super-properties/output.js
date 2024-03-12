var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.get((_this, babelHelpers.getPrototypeOf(Test.prototype)), "test", _this).whatever();
    babelHelpers.get((_this, babelHelpers.getPrototypeOf(Test.prototype)), "test", _this).call(_this);
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Test), "wow", this).call(this);
    }
  }]);
}(Foo);
