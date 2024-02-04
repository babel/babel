var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.callSuper(this, Test);
    _Foo.prototype.test.whatever();
    _Foo.prototype.test.call(babelHelpers.assertThisInitialized(_this));
    return _this;
  }
  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return _Foo.wow.call(this);
    }
  }]);
  return Test;
}(Foo);
