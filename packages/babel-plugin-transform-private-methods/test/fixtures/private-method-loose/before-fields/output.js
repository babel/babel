var _priv = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("priv");
var _method = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("method");
class Cl {
  constructor() {
    Object.defineProperty(this, _method, {
      value: _method2
    });
    this.prop = this[_method](1);
    Object.defineProperty(this, _priv, {
      writable: true,
      value: this[_method](2)
    });
  }
  getPriv() {
    return babelHelpers.assertClassBrandLoose(this, _priv, 1);
  }
}
function _method2(x) {
  return x;
}
