var _class, _temp, _2, _class2, _temp2, _3;

class Foo extends (_temp = _class = class extends (_temp2 = _class2 = class Base {}, _3 = {
  writable: true,
  value: (() => {
    _class2.qux = 21;
  })()
}, _temp2) {}, _2 = {
  writable: true,
  value: (() => {
    _class.bar = 21;
  })()
}, _temp) {}

var _ = {
  writable: true,
  value: (() => {
    Foo.foo = Foo.bar + Foo.qux;
  })()
};
expect(Foo.foo).toBe(42);
