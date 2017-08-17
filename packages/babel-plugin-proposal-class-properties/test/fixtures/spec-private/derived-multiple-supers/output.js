var _bar;

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

_bar = new WeakMap();

var _initialiseProps = function (_this) {
  _bar.set(_this, "foo");
};