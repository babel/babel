class Cl {
  publicMethod(checked) {
    return babelHelpers.classPrivateFieldLooseBase(checked, _privateStaticMethod)[_privateStaticMethod]();
  }

}

var _privateStaticMethod = babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");

var _privateStaticMethod2 = function _privateStaticMethod2() {};

Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
