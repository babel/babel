var _ = babelHelpers.classPrivateFieldLooseKey("_");

var _2 = babelHelpers.classPrivateFieldLooseKey("_2");

class Foo {}

Object.defineProperty(Foo, _, {
  writable: true,
  value: 42
});
Object.defineProperty(Foo, _2, {
  writable: true,
  value: (() => {
    Foo.foo = babelHelpers.classPrivateFieldLooseBase(Foo, _)[_];
  })()
});
expect(Foo.foo).toBe(42);
