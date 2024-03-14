var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.callSuper(this, Test);
    _Foo.prototype.test.whatever();
    _Foo.prototype.test.call(_this);
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return _Foo.wow.call(this);
    }
  }]);
}(Foo);
