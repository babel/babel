var Bar = function Bar() {
  babelHelpers.classCallCheck(this, Bar);
};

var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this.foo = "bar";
    return _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));
  }

  return Foo;
}(Bar);
