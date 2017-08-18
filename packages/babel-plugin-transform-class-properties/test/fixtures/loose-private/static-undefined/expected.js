var _bar;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

_bar = babelHelpers.privateClassPropertyKey("bar");
Object.defineProperty(Foo, _bar, {
  writable: true,
  value: void 0
});
