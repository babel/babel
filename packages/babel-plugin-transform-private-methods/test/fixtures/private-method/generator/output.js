var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
  }
  test() {
    return babelHelpers.classPrivateMethodGet(this, _Cl_brand, _foo).call(this);
  }
}
function* _foo() {
  yield 2;
  return 3;
}
