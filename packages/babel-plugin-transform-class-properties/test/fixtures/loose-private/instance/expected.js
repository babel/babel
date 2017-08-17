var _bar;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _bar, {
    writable: true,
    value: "foo"
  });
};

_bar = babelHelpers.privateClassPropertyKey("bar");