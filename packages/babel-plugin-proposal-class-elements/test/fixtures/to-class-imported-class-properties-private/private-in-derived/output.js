var _outer = /*#__PURE__*/new WeakMap();

var Outer = function Outer() {
  "use strict";

  babelHelpers.classCallCheck(this, Outer);

  _outer.set(this, void 0);

  var Test = /*#__PURE__*/function (_babelHelpers$classPr) {
    babelHelpers.inherits(Test, _babelHelpers$classPr);

    var _super = babelHelpers.createSuper(Test);

    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return _super.apply(this, arguments);
    }

    return Test;
  }(babelHelpers.classPrivateFieldGet2(this, _outer));
};
