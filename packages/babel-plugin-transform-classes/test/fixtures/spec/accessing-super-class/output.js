var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.superPropertyGetCall((_this, Test), "test", _this, 1, []);
    _this = babelHelpers.callSuper(this, Test, arguments);
    _this = babelHelpers.callSuper(this, Test, ["test"].concat(Array.prototype.slice.call(arguments)));
    babelHelpers.superPropertyGetCall((_this, Test), "test", _this, 1, arguments);
    babelHelpers.superPropertyGetCall((_this, Test), "test", _this, 1, ["test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      babelHelpers.superPropertyGetCall(Test, "test", this, 1, []);
      babelHelpers.superPropertyGetCall(Test, "test", this, 1, arguments);
      babelHelpers.superPropertyGetCall(Test, "test", this, 1, ["test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      babelHelpers.superPropertyGetCall(Test, "foo", this, 0, []);
      babelHelpers.superPropertyGetCall(Test, "foo", this, 0, arguments);
      babelHelpers.superPropertyGetCall(Test, "foo", this, 0, ["test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
}(Foo);
