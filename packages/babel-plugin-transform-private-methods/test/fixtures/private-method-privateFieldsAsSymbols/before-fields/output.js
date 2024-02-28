var _priv = /*#__PURE__*/Symbol("priv");
var _method = /*#__PURE__*/Symbol("method");
class Cl {
  constructor() {
    Object.defineProperty(this, _method, {
      value: _method2
    });
    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateFieldLooseBase(this, _method)[_method](1));
    Object.defineProperty(this, _priv, {
      writable: true,
      value: babelHelpers.classPrivateFieldLooseBase(this, _method)[_method](2)
    });
  }
  getPriv() {
    return babelHelpers.classPrivateFieldLooseBase(this, _priv)[_priv];
  }
}
function _method2(x) {
  return x;
}
