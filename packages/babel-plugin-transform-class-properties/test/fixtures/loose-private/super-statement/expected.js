var _bar;

var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    var _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

    Object.defineProperty(_this, _bar, {
      writable: true,
      value: "foo"
    });
    return _this;
  }

  return Foo;
}(Bar);

_bar = babelHelpers.privateClassPropertyKey("bar");