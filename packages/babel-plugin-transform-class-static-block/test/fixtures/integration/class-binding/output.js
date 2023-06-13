var _class;
class Foo {}
_class = Foo;
babelHelpers.defineProperty(Foo, "bar", 42);
_class.foo = _class.bar;
expect(Foo.foo).toBe(42);
