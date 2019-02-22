class Cl {
  static staticMethod2() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
  }

  static staticMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
  }

  static privateStaticMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
  }

  publicMethod() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
  }

  constructor() {
    this.instanceField = babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
  }

}

var _privateStaticMethod = function _privateStaticMethod() {
  return 1017;
};
