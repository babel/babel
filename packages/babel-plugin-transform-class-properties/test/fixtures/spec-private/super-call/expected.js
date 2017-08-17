var _foo;

var A = function () {
  function A() {
    babelHelpers.classCallCheck(this, A);
  }

  babelHelpers.createClass(A, [{
    key: "foo",
    value: function foo() {
      return "bar";
    }
  }]);
  return A;
}();

var B = function (_A) {
  babelHelpers.inherits(B, _A);

  function B() {
    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, B);
    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments)), _this), _foo.set(_this, babelHelpers.get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), "foo", _this).call(_this)), _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  return B;
}(A);

_foo = new WeakMap();