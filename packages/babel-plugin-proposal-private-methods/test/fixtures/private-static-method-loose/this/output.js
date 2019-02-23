class Cl {
  static check() {
    return babelHelpers.classPrivateFieldLooseBase(this, _staticPrivateMethod)[_staticPrivateMethod]();
  }

}

var _staticPrivateMethod = babelHelpers.classPrivateFieldLooseKey("staticPrivateMethod");

Cl.staticField = 'staticFieldString';

var _staticPrivateMethod2 = function _staticPrivateMethod2() {
  return Cl.staticField;
};

Object.defineProperty(Cl, _staticPrivateMethod, {
  value: _staticPrivateMethod2
});
