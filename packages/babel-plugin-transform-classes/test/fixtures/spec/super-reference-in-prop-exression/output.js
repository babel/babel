var called = false;

var A =
/*#__PURE__*/
function () {
  function A() {
    babelHelpers.classCallCheck(this, A);
  }

  babelHelpers.createClass(A, [{
    key: "method",
    value: function method() {
      called = true;
    }
  }, {
    key: "methodName",
    get: function get() {
      return "method";
    }
  }]);
  return A;
}();

var B =
/*#__PURE__*/
function (_A) {
  babelHelpers.inherits(B, _A);

  function B() {
    var _this;

    babelHelpers.classCallCheck(this, B);
    babelHelpers.get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), (_this = babelHelpers.possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this))).methodName, babelHelpers.assertThisInitialized(_this)).call(_this);
    return _this;
  }

  return B;
}(A);

new B();
