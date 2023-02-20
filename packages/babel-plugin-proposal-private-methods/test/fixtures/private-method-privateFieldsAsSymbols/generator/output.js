var _foo = /*#__PURE__*/Symbol("foo");
class Cl {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }
  test() {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }
}
function* _foo2() {
  yield 2;
  return 3;
}
