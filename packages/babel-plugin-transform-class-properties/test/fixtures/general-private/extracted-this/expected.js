var _bar, _baz;

var foo = "bar";

var Foo = function Foo(foo) {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);
};

_bar = new WeakMap();
_baz = new WeakMap();

function _initialiseProps(_this) {
  _bar.set(_this, _this);

  _baz.set(_this, foo);
}
