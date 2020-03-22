var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _babelHelpers$get;

    var _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);
    babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).call(babelHelpers.assertThisInitialized(_this));
    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_babelHelpers$get = babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this))).call.apply(_babelHelpers$get, [babelHelpers.assertThisInitialized(_this), "test"].concat(Array.prototype.slice.call(arguments)));

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
