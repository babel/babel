let A = /*#__PURE__*/function () {
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
var _foo = /*#__PURE__*/new WeakMap();
let B = /*#__PURE__*/function (_A) {
  "use strict";

  function B(...args) {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, B);
    _this = babelHelpers.callSuper(this, B, [...args]);
    babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _foo, babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(B.prototype)), "foo", _thisSuper).call(_thisSuper));
    return _this;
  }
  babelHelpers.inherits(B, _A);
  return babelHelpers.createClass(B);
}(A);
