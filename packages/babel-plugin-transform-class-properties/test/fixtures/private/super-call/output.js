var A = /*#__PURE__*/function () {
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
var _foo = /*#__PURE__*/new WeakMap();
var B = /*#__PURE__*/function (_A) {
  "use strict";

  babelHelpers.inherits(B, _A);
  function B(...args) {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, B);
    _this = babelHelpers.callSuper(this, B, [...args]);
    babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _foo, {
      writable: true,
      value: babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(B.prototype)), "foo", _thisSuper).call(_thisSuper)
    });
    return _this;
  }
  return babelHelpers.createClass(B);
}(A);
