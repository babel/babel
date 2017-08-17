var _bar;

var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, Foo);
    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments)), _this), _bar.set(_this, "foo"), _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  return Foo;
}(Bar);

_bar = new WeakMap();