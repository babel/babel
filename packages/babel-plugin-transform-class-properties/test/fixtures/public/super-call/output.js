var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  return babelHelpers.createClass(A, [{
    key: "foo",
    value: function foo() {
      return "bar";
    }
  }]);
}();
var B = /*#__PURE__*/function (_A) {
  "use strict";

  function B(...args) {
    var _this;
    babelHelpers.classCallCheck(this, B);
    _this = babelHelpers.callSuper(this, B, [...args]);
    babelHelpers.defineProperty(_this, "foo", babelHelpers.get((_this, babelHelpers.getPrototypeOf(B.prototype)), "foo", _this).call(_this));
    return _this;
  }
  babelHelpers.inherits(B, _A);
  return babelHelpers.createClass(B);
}(A);
