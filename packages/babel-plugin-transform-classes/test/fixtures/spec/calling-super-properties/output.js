var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.superPropGet((_this, Test), "test", _this, 1).whatever();
    babelHelpers.superPropGet((_this, Test), "test", _this, 3)([]);
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.superPropGet(Test, "wow", this, 2)([]);
    }
  }]);
}(Foo);
