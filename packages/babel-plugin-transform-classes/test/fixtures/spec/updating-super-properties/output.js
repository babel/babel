var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    var _this;

    babelHelpers.classCallCheck(this, Test);
    _this = babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));

    var _ref = babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this));

    babelHelpers.set(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", _ref + 1, _this);
    _ref;
    babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "hey", babelHelpers.assertThisInitialized(_this)).whatever--;
    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "x",
    get: function get() {
      var _ref2;

      return _ref2 = babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), 'value', this), babelHelpers.set(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), 'value', _ref2 + 1, this), _ref2;
    }
  }]);
  return Test;
}(Foo);
