var _foo = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
  test() {
    return babelHelpers.classPrivateMethodGet(this, _foo, _foo2).call(this);
  }
}
async function _foo2() {
  return 2;
}
