class Foo {}
var _ = {
  writable: true,
  value: 42
};
// static block can not be tranformed as `#_` here

Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _);
expect(Foo.foo).toBe(42);
