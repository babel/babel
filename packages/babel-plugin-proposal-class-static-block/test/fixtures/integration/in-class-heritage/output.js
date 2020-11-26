var _class, _temp, _2, Base, _temp2, _3;

class Foo extends (_temp = _class = class extends (_temp2 = Base = class Base {}, _3 = {
  writable: true,
  value: (() => {
    Base.qux = 21;
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
