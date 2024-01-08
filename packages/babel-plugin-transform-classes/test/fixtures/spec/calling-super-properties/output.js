var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  function Test() {
    var _thisSuper, _thisSuper2, _this;
    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper).whatever();
    babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper2).call(_thisSuper2);
    return _this;
  }
  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Test), "wow", this).call(this);
    }
  }]);
  return Test;
}(Foo);
