class Foo {}

var _bar = {
  writable: true,
  value: 21
};
var _ = {
  writable: true,
  value: (() => {
    Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _bar);
    Foo.qux1 = Foo.qux;
  })()
};
babelHelpers.defineProperty(Foo, "qux", 21);
var _2 = {
  writable: true,
  value: (() => {
    Foo.qux2 = Foo.qux;
  })()
};
