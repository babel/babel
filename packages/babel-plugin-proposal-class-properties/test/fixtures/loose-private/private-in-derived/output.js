var _outer;

var Outer = function Outer() {
  babelHelpers.classCallCheck(this, Outer);
  Object.defineProperty(this, _outer, {
    writable: true,
    value: void 0
  });

  var Test = function (_this$_outer) {
    babelHelpers.inherits(Test, _this$_outer);

    function Test() {
      babelHelpers.classCallCheck(this, Test);
      return babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
    }

    return Test;
  }(this[_outer]);
};

_outer = babelHelpers.classPrivateFieldKey("outer");
