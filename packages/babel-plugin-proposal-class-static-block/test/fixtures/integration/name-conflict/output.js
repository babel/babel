class Foo {}

var _ = {
  writable: true,
  value: 42
};
var _2 = {
  writable: true,
  value: (() => {
    Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _);
  })()
};
expect(Foo.foo).toBe(42);
