var _ref, _class, _class2;
class Foo extends (_ref = (_class2 = class _ref {}, _class2.bar = 42, _class2)) {}
_class = Foo;
Foo.bar = 21;
_class.foo = _ref.bar;
expect(Foo.foo).toBe(42);
