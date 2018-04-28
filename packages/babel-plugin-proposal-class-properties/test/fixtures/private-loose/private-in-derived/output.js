var Outer = function Outer() {
  "use strict";

  babelHelpers.classCallCheck(this, Outer);
  Object.defineProperty(this, _outer, {
    writable: true,
    value: void 0
  });

  var Test =
  /*#__PURE__*/
  function (_babelHelpers$classPr) {
    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Test).apply(this, arguments));
    }

    babelHelpers.inherits(Test, _babelHelpers$classPr);
    return Test;
  }(babelHelpers.classPrivateFieldBase(this, _outer)[_outer]);
};

var _outer = babelHelpers.classPrivateFieldKey("outer");
