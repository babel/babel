var _priv = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("priv");
var _method = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("method");
class Cl {
  constructor() {
    Object.defineProperty(this, _method, {
      value: _method2
    });
    babelHelpers.defineProperty(this, "prop", this[_method](1));
    Object.defineProperty(this, _priv, {
      writable: true,
      value: this[_method](2)
    });
  }
  getPriv() {
    return babelHelpers.classPrivateFieldLoose(this, _priv);
  }
}
function _method2(x) {
  return x;
}
