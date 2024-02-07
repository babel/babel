var _priv = /*#__PURE__*/new WeakMap();
var _method = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _method);
    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 1));
    babelHelpers.classPrivateFieldInitSpec(this, _priv, babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 2));
  }
  getPriv() {
    return babelHelpers.classPrivateFieldGet2(this, _priv);
  }
}
function _method2(x) {
  return x;
}
