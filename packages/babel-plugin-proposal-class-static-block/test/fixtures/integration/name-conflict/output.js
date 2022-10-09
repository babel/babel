class Foo {}
var _ = {
  writable: true,
  value: 42
};
Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _);
expect(Foo.foo).toBe(42);
