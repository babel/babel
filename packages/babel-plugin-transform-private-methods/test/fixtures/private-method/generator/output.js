var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
  }
  test() {
    return babelHelpers.assertClassBrand(_Cl_brand, this, _foo).call(this);
  }
}
function* _foo() {
  yield 2;
  return 3;
}
