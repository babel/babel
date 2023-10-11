class Cl {
  static staticMethod2() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
  static staticMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
  static privateStaticMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
  publicMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
  constructor() {
    this.instanceField = babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod).call(Cl);
  }
}
function _privateStaticMethod() {
  return 1017;
}
