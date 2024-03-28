var _foo = Symbol("foo");
class Cl {
  test() {
    return Cl[_foo]();
  }
}
function* _foo2() {
  yield 2;
  return 3;
}
Object.defineProperty(Cl, _foo, {
  value: _foo2
});
