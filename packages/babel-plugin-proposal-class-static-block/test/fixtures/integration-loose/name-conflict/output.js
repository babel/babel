var _ = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("_");
class Foo {}
Object.defineProperty(Foo, _, {
  writable: true,
  value: 42
});
// static block can not be transformed as `#_` here

Foo.foo = babelHelpers.classPrivateFieldLooseBase(Foo, _)[_];
expect(Foo.foo).toBe(42);
