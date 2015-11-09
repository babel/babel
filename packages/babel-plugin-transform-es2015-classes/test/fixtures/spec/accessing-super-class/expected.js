var _Object$getPrototypeO;

var Test = (function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _babelHelpers$get;

    babelHelpers.classCallCheck(this, Test);

    woops.super.test();

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Test).call(this));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).call(_this);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));

    var _this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Test)).call.apply(_Object$getPrototypeO, [this, "test"].concat(Array.prototype.slice.call(arguments))));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this).apply(_this, arguments);
    (_babelHelpers$get = babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", _this)).call.apply(_babelHelpers$get, [_this, "test"].concat(Array.prototype.slice.call(arguments)));
    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      var _babelHelpers$get2;

      babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
      babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);
      (_babelHelpers$get2 = babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_babelHelpers$get2, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      var _babelHelpers$get3;

      babelHelpers.get(Object.getPrototypeOf(Test), "foo", this).call(this);
      babelHelpers.get(Object.getPrototypeOf(Test), "foo", this).apply(this, arguments);
      (_babelHelpers$get3 = babelHelpers.get(Object.getPrototypeOf(Test), "foo", this)).call.apply(_babelHelpers$get3, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
  return Test;
})(Foo);
