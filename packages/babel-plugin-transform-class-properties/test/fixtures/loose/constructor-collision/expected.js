var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps.call(this);

  var foo = "foo";
};

var _initialiseProps = function () {
  this.bar = foo;
};
