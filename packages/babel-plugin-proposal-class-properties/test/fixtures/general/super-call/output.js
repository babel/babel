var A =
/*#__PURE__*/
function () {
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

var B =
/*#__PURE__*/
function (_A) {
  babelHelpers.inherits(B, _A);

  function B(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, B);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, ...args)), Object.defineProperty(babelHelpers.assertThisInitialized(_this), "foo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: babelHelpers.get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), "foo", babelHelpers.assertThisInitialized(_this)).call(_this)
    }), _temp));
  }

  return B;
}(A);
