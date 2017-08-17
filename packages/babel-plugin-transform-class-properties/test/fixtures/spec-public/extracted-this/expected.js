var foo = "bar";

var Foo = function Foo(foo) {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);
};

var _initialiseProps = function (_this) {
  Object.defineProperty(_this, "bar", {
    enumerable: true,
    writable: true,
    value: _this
  });
  Object.defineProperty(_this, "baz", {
    enumerable: true,
    writable: true,
    value: foo
  });
};