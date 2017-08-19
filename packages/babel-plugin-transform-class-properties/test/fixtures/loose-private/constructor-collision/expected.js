var _bar;

var foo = "bar";

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _initialiseProps(this);

  var foo = "foo";
};

_bar = babelHelpers.privateClassPropertyKey("bar");

function _initialiseProps(_this) {
  Object.defineProperty(_this, _bar, {
    writable: true,
    value: foo
  });
}
