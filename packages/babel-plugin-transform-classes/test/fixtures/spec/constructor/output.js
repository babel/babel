var Test = function Test() {
  babelHelpers.classCallCheck(this, Test);
  this.state = "test";
};

var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    _this.state = "test";
    return _this;
  }

  return Foo;
}(Bar);

var ConstructorScoping = function ConstructorScoping() {
  babelHelpers.classCallCheck(this, ConstructorScoping);
  var bar;
  {
    var _bar;
  }
};
