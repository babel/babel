var _priv = new WeakMap();

var _method = new WeakSet();

class Cl {
  constructor() {
    _method.add(this);

    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 1));

    _priv.set(this, {
      writable: true,
      value: babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 2)
    });
  }

  getPriv() {
    return babelHelpers.classPrivateFieldGet(this, _priv);
  }

}

var _method2 = function _method2(x) {
  return x;
};
