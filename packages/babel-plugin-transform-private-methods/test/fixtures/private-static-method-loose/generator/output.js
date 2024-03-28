var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
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
