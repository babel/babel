class Foo {}
var _ = {
  writable: true,
  value: 42
};
// static block can not be transformed as `#_` here

Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _);
expect(Foo.foo).toBe(42);
