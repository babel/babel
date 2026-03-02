class Cl {
  test() {
    return _foo.call(Cl);
  }
}
function* _foo() {
  yield 2;
  return 3;
}
