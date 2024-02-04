var _Foo;
class Foo {}
_Foo = Foo;
var _ = {
  writable: true,
  value: 42
};
// static block can not be transformed as `#_` here

_Foo.foo = babelHelpers.classStaticPrivateFieldSpecGet(_Foo, _Foo, _);
expect(Foo.foo).toBe(42);
