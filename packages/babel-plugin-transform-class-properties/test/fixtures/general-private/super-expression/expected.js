var _bar;

var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    foo((_temp = _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this)), _bar.set(_this, "foo"), _temp));
    return _this;
  }

  return Foo;
}(Bar);

_bar = new WeakMap();
