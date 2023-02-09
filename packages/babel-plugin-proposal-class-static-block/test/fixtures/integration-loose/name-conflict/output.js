var _ = /*#__PURE__*/Symbol("_");
class Foo {}
Object.defineProperty(Foo, _, {
  writable: true,
  value: 42
});
Foo.foo = babelHelpers.classPrivateFieldLooseBase(Foo, _)[_];
expect(Foo.foo).toBe(42);
