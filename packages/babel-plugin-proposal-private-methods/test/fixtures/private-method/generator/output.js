var _foo = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
  test() {
    return babelHelpers.classPrivateMethodGet(this, _foo, _foo2).call(this);
  }
}
function* _foo2() {
  yield 2;
  return 3;
}
