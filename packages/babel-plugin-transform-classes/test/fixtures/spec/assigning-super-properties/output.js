var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _this;

    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));
    babelHelpers.set(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", 1, _this);
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).whatever = 2;
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "boo", babelHelpers.assertThisInitialized(_this)).more *= 2;
    return _this;
  }

  return Test;
}(Foo);
