var Foo = (0,
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    var t = () => babelHelpers.get(Foo.prototype.__proto__ || Object.getPrototypeOf(Foo.prototype), "test", babelHelpers.assertThisInitialized(_this)).call(_this);

    _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));
    t();
    return _this;
  }

  return Foo;
}(Bar));
