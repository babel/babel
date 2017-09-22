var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments)), Object.defineProperty(_this, "bar", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "foo"
    }), _temp));
  }

  return Foo;
}(Bar);
