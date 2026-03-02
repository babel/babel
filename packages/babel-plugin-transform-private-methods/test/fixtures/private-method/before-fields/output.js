var _priv = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.defineProperty(this, "prop", babelHelpers.assertClassBrand(_Cl_brand, this, _method).call(this, 1));
    babelHelpers.classPrivateFieldInitSpec(this, _priv, babelHelpers.assertClassBrand(_Cl_brand, this, _method).call(this, 2));
  }
  getPriv() {
    return babelHelpers.classPrivateFieldGet2(_priv, this);
  }
}
function _method(x) {
  return x;
}
