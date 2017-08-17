var foo = "bar";

var Foo = function Foo(foo) {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);
};

var _initialiseProps = function (_this) {
  _this.bar = _this;
  _this.baz = foo;
};