var _outer = /*#__PURE__*/new WeakMap();
var Outer = /*#__PURE__*/babelHelpers.createClass(function Outer() {
  "use strict";

  babelHelpers.classCallCheck(this, Outer);
  babelHelpers.classPrivateFieldInitSpec(this, _outer, {
    writable: true,
    value: void 0
  });
  var Test = /*#__PURE__*/function (_babelHelpers$classPr) {
    babelHelpers.inherits(Test, _babelHelpers$classPr);
    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return babelHelpers.callSuper(this, Test, arguments);
    }
    return babelHelpers.createClass(Test);
  }(babelHelpers.classPrivateFieldGet(this, _outer));
});
