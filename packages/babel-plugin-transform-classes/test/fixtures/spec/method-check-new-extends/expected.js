var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));
    _this.state = "test";
    return _this;
  }

  babelHelpers.createClass(Foo, [{
    key: "bar",
    value: function bar() {
      babelHelpers.newMethodCheck(this, Foo.prototype.bar);
      return 1;
    }
  }]);
  return Foo;
}(Bar);
