var _ref, _class, _temp;

class Foo extends (_ref = (_temp = _class = class _ref {}, (() => {
  _class.bar = 42;
})(), _temp)) {}

Foo.bar = 21;

(() => {
  Foo.foo = _ref.bar;
})();

expect(Foo.foo).toBe(42);
