class Foo {}

babelHelpers.defineProperty(Foo, "bar", 42);
var _ = {
  writable: true,
  value: (() => {
    Foo.foo = Foo.bar;
  })()
};
expect(Foo.foo).toBe(42);
