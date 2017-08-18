var _bar;

var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

    _bar.set(_this, "foo");

    return _this;
  }

  return Foo;
}(Bar);

_bar = new WeakMap();
