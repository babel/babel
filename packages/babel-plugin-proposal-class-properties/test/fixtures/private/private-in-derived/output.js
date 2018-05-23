var Outer = function Outer() {
  "use strict";

  babelHelpers.classCallCheck(this, Outer);

  _outer.set(this, void 0);

  var Test =
  /*#__PURE__*/
  function (_babelHelpers$classPr) {
    babelHelpers.inherits(Test, _babelHelpers$classPr);

    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Test).apply(this, arguments));
    }

    return Test;
  }(babelHelpers.classPrivateFieldGet(this, _outer));
};

var _outer = new WeakMap();
