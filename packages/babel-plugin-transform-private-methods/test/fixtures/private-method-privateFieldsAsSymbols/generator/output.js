var _foo = Symbol("foo");
class Cl {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }
  test() {
    return this[_foo]();
  }
}
function* _foo2() {
  yield 2;
  return 3;
}
