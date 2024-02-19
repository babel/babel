var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
  }
  test() {
    return babelHelpers.assertClassBrand(this, _Cl_brand, _foo).call(this);
  }
}
async function _foo() {
  return 2;
}
