var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _babelHelpers$get;

    var _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Test, [], this));
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).call(_this);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Test, arguments, this));
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Test, ["test"].concat(Array.prototype.slice.call(arguments)), this));
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).apply(_this, arguments);

    (_babelHelpers$get = babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this))).call.apply(_babelHelpers$get, [_this, "test"].concat(Array.prototype.slice.call(arguments)));

    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      var _babelHelpers$get2;

      babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", this).call(this);
      babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);

      (_babelHelpers$get2 = babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_babelHelpers$get2, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      var _babelHelpers$get3;

      babelHelpers.get(Test.__proto__ || Object.getPrototypeOf(Test), "foo", this).call(this);
      babelHelpers.get(Test.__proto__ || Object.getPrototypeOf(Test), "foo", this).apply(this, arguments);

      (_babelHelpers$get3 = babelHelpers.get(Test.__proto__ || Object.getPrototypeOf(Test), "foo", this)).call.apply(_babelHelpers$get3, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
  return Test;
}(Foo);
