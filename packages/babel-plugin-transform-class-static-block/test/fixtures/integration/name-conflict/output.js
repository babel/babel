var _Foo;
class Foo {}
_Foo = Foo;
var _ = {
  _: 42
};
// static block can not be transformed as `#_` here

_Foo.foo = babelHelpers.assertClassBrand(_Foo, _Foo, _)._;
expect(Foo.foo).toBe(42);
