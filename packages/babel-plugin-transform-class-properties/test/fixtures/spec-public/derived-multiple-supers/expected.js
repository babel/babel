var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    if (condition) {
      var _this2 = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

      _initialiseProps(_this2);
    } else {
      var _this2 = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

      _initialiseProps(_this2);
    }

    return babelHelpers.possibleConstructorReturn(_this2);
  }

  return Foo;
}(Bar);

var _initialiseProps = function (_this) {
  Object.defineProperty(_this, "bar", {
    enumerable: true,
    writable: true,
    value: "foo"
  });
};