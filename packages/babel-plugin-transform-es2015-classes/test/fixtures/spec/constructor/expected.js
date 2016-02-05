var Test = function Test() {
  babelHelpers.classCallCheck(this, Test);

  this.state = "test";
};

var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Foo).call(this));

    _this.state = "test";
    return _this;
  }

  return Foo;
}(Bar);

var ConstructorScoping = function ConstructorScoping() {
  babelHelpers.classCallCheck(this, ConstructorScoping);

  var bar = undefined;
  {
    var _bar = undefined;
  }
};
