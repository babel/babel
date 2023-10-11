var _class;
var _ = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("_");
class Foo {}
_class = Foo;
Object.defineProperty(Foo, _, {
  writable: true,
  value: 42
});
// static block can not be transformed as `#_` here

_class.foo = babelHelpers.classPrivateFieldLooseBase(_class, _)[_];
expect(Foo.foo).toBe(42);
