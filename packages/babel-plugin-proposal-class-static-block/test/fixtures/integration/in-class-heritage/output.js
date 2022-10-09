var _class, _class2;
class Foo extends (_class = class extends (_class2 = class Base {}, _class2.qux = 21, _class2) {}, _class.bar = 21, _class) {}
Foo.foo = Foo.bar + Foo.qux;
expect(Foo.foo).toBe(42);
