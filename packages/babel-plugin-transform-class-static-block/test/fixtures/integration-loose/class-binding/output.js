var _Foo;
class Foo {}
_Foo = Foo;
Foo.bar = 42;
_Foo.foo = _Foo.bar;
expect(Foo.foo).toBe(42);
