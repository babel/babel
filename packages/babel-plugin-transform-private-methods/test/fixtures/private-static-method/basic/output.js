class Cl {
  static staticMethod2() {
    return _privateStaticMethod.call(Cl);
  }
  static staticMethod() {
    return _privateStaticMethod.call(Cl);
  }
  static privateStaticMethod() {
    return _privateStaticMethod.call(Cl);
  }
  publicMethod() {
    return _privateStaticMethod.call(Cl);
  }
  constructor() {
    this.instanceField = _privateStaticMethod.call(Cl);
  }
}
function _privateStaticMethod() {
  return 1017;
}
