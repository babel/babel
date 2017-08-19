var foo = "bar";

var Foo = function Foo(foo) {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);
};

function _initialiseProps(_this) {
  Object.defineProperty(_this, "bar", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: _this
  });
  Object.defineProperty(_this, "baz", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: foo
  });
}
