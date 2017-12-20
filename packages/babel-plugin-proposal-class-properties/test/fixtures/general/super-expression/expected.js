var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    foo((_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Foo, [], this)), Object.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "foo"
    }), _temp));
    return _this;
  }

  return Foo;
}(Bar);
