var _class, _temp;

class Foo extends (_temp = _class = class {}, (() => {
  _class.bar = 42;
})(), _temp) {}

Foo.bar = 21;

(() => {
  var _class2, _temp2;

  Foo.foo = (_temp2 = _class2 = class {}, (() => {
    _class2.bar = 42;
  })(), _temp2).bar;
})();

expect(Foo.foo).toBe(42);
