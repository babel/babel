var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps.call(this);

  var foo = "foo";
};

var _initialiseProps = function () {
  Object.defineProperty(this, "bar", {
    enumerable: true,
    writable: true,
    value: foo
  });
};
