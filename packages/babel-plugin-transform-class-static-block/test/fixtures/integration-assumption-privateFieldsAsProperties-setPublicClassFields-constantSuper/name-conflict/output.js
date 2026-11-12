var _Foo;
var _ = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("_");
class Foo {}
_Foo = Foo;
Object.defineProperty(Foo, _, {
  writable: true,
  value: 42
});
// static block can not be transformed as `#_` here

_Foo.foo = babelHelpers.classPrivateFieldLooseBase(_Foo, _)[_];
expect(Foo.foo).toBe(42);
