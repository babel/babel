var _outer;

var Outer = function Outer() {
  babelHelpers.classCallCheck(this, Outer);
  Object.defineProperty(this, _outer, {
    writable: true,
    value: void 0
  });

  var Test =
  /*#__PURE__*/
  function (_babelHelpers$classPr) {
    babelHelpers.inherits(Test, _babelHelpers$classPr);

    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
    }

    return Test;
  }(babelHelpers.classPrivateFieldBase(this, _outer)[_outer]);
};

_outer = babelHelpers.classPrivateFieldKey("outer");
