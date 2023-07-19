var _class;
class Foo {}
_class = Foo;
var _ = {
  writable: true,
  value: 42
};
// static block can not be transformed as `#_` here

_class.foo = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _);
expect(Foo.foo).toBe(42);
