var _priv = Symbol("priv");
var _method = Symbol("method");
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
    return babelHelpers.assertClassBrandLoose(this, _priv, 1);
  }
}
function _method2(x) {
  return x;
}
