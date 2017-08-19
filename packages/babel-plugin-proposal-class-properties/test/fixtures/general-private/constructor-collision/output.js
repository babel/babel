var _bar;

var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);

  var foo = "foo";
};

_bar = new WeakMap();

function _initialiseProps(_this) {
  _bar.set(_this, foo);
}
