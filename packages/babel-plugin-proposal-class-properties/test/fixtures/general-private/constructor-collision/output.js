var _bar;

var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);

  var foo = "foo";
};

_bar = new WeakMap();

var _initialiseProps = function (_this) {
  _bar.set(_this, foo);
};
