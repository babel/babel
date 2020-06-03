var _privateStaticMethod = babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");

class Cl {
  constructor() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticMethod)[_privateStaticMethod] = null;
  }

}

var _privateStaticMethod2 = function _privateStaticMethod2() {};

Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
new Cl();
