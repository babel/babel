var _class, _class2, _class3;
class Foo extends (_class2 = class extends (_class3 = class Base {}, _class3.qux = 21, _class3) {}, _class2.bar = 21, _class2) {}
_class = Foo;
_class.foo = _class.bar + _class.qux;
expect(Foo.foo).toBe(42);
