var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.superPropGet((_this, Test), "test", _this, 3)([]);
    _this = babelHelpers.callSuper(this, Test, arguments);
    _this = babelHelpers.callSuper(this, Test, ["test"].concat(Array.prototype.slice.call(arguments)));
    babelHelpers.superPropGet((_this, Test), "test", _this, 3)(arguments);
    babelHelpers.superPropGet((_this, Test), "test", _this, 3)(["test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      babelHelpers.superPropGet(Test, "test", this, 3)([]);
      babelHelpers.superPropGet(Test, "test", this, 3)(arguments);
      babelHelpers.superPropGet(Test, "test", this, 3)(["test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      babelHelpers.superPropGet(Test, "foo", this, 2)([]);
      babelHelpers.superPropGet(Test, "foo", this, 2)(arguments);
      babelHelpers.superPropGet(Test, "foo", this, 2)(["test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
}(Foo);
