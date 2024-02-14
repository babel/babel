var _priv = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateMethodGet(this, _Cl_brand, _method).call(this, 1));
    babelHelpers.classPrivateFieldInitSpec(this, _priv, babelHelpers.classPrivateMethodGet(this, _Cl_brand, _method).call(this, 2));
  }
  getPriv() {
    return babelHelpers.classPrivateFieldGet2(this, _priv);
  }
}
function _method(x) {
  return x;
}
