var _privateStaticMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");
class Cl {
  static staticMethod2() {
    return Cl[_privateStaticMethod]();
  }
  static staticMethod() {
    return Cl[_privateStaticMethod]();
  }
  static privateStaticMethod() {
    return Cl[_privateStaticMethod]();
  }
  publicMethod() {
    return Cl[_privateStaticMethod]();
  }
  constructor() {
    this.instanceField = Cl[_privateStaticMethod]();
  }
}
function _privateStaticMethod2() {
  return 1017;
}
Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
