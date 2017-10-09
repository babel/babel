let Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    const t = () => babelHelpers.get(Foo.prototype.__proto__ || Object.getPrototypeOf(Foo.prototype), "test", babelHelpers.assertThisInitialized(_this)).call(_this);

    babelHelpers.get(Foo.prototype.__proto__ || Object.getPrototypeOf(Foo.prototype), "foo", babelHelpers.assertThisInitialized(_this)).call(_this);
    return _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));
  }

  return Foo;
}(Bar);
