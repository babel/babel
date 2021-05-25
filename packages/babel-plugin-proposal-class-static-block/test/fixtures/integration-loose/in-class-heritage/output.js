var _class, _temp, _class2, _temp2;

class Foo extends (_temp = _class = class extends (_temp2 = _class2 = class Base {}, (() => {
  _class2.qux = 21;
})(), _temp2) {}, (() => {
  _class.bar = 21;
})(), _temp) {}

(() => {
  Foo.foo = Foo.bar + Foo.qux;
})();

expect(Foo.foo).toBe(42);
