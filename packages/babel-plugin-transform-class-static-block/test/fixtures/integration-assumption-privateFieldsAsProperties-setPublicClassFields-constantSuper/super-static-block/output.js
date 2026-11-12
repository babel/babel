var _ref, _Foo, _Class;
class Foo extends (_ref = (_Class = class _ref {}, _Class.bar = 42, _Class)) {}
_Foo = Foo;
Foo.bar = 21;
_Foo.foo = _ref.bar;
expect(Foo.foo).toBe(42);
