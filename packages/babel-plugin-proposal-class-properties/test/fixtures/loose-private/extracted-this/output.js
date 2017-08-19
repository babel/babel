var _bar, _baz;

var foo = "bar";

var Foo = function Foo(foo) {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);
};

_bar = babelHelpers.privateClassPropertyKey("bar");
_baz = babelHelpers.privateClassPropertyKey("baz");

function _initialiseProps(_this) {
  Object.defineProperty(_this, _bar, {
    writable: true,
    value: _this
  });
  Object.defineProperty(_this, _baz, {
    writable: true,
    value: foo
  });
}
