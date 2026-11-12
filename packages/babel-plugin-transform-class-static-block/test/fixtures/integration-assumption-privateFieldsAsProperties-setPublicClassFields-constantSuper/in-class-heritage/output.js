var _Foo, _Class, _Base;
class Foo extends (_Class = class extends (_Base = class Base {}, _Base.qux = 21, _Base) {}, _Class.bar = 21, _Class) {}
_Foo = Foo;
_Foo.foo = _Foo.bar + _Foo.qux;
expect(Foo.foo).toBe(42);
