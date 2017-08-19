var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);

  var foo = "foo";
};

function _initialiseProps(_this) {
  Object.defineProperty(_this, "bar", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: foo
  });
}
