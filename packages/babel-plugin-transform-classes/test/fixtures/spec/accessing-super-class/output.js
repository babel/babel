var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  function Test() {
    var _babelHelpers$get;
    var _thisSuper, _thisSuper2, _thisSuper3, _this;
    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.callSuper(this, Test);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper).call(_thisSuper);
    _this = babelHelpers.callSuper(this, Test, arguments);
    _this = babelHelpers.callSuper(this, Test, ["test"].concat(Array.prototype.slice.call(arguments)));
    babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper2).apply(_thisSuper2, arguments);
    (_babelHelpers$get = babelHelpers.get((_thisSuper3 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper3)).call.apply(_babelHelpers$get, [_thisSuper3, "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }
  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      var _babelHelpers$get2;
      babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this).call(this);
      babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);
      (_babelHelpers$get2 = babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this)).call.apply(_babelHelpers$get2, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      var _babelHelpers$get3;
      babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this).call(this);
      babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this).apply(this, arguments);
      (_babelHelpers$get3 = babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this)).call.apply(_babelHelpers$get3, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
  return Test;
}(Foo);
