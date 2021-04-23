var _ = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("_");

class Foo {}

Foo.bar = 42;
Object.defineProperty(Foo, _, {
  writable: true,
  value: (() => {
    Foo.foo = Foo.bar;
  })()
});
expect(Foo.foo).toBe(42);
