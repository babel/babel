var _priv = /*#__PURE__*/Symbol("priv");
var _Cl_brand = /*#__PURE__*/Symbol("method");
class Cl {
  constructor() {
    Object.defineProperty(this, _Cl_brand, {
      value: _method
    });
    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand](1));
    Object.defineProperty(this, _priv, {
      writable: true,
      value: babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand](2)
    });
  }
  getPriv() {
    return babelHelpers.classPrivateFieldLooseBase(this, _priv)[_priv];
  }
}
function _method(x) {
  return x;
}
