var _ref, _class;
class Foo extends (_ref = (_class = class _ref {}, _class.bar = 42, _class)) {}
Foo.bar = 21;
Foo.foo = _ref.bar;
expect(Foo.foo).toBe(42);
