var A =
/*#__PURE__*/
function () {
  "use strict";

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
  "use strict";

  function B(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, B);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(B).call(this, ...args)), _this.foo = babelHelpers.get(babelHelpers.getPrototypeOf(B.prototype), "foo", babelHelpers.assertThisInitialized(_this)).call(_this), _temp));
  }

  babelHelpers.inherits(B, _A);
  return B;
}(A);
