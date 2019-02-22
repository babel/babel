class Cl {
  publicMethod(checked) {
    return babelHelpers.classStaticPrivateMethodGet(checked, Cl, _privateStaticMethod);
  }

}

var _privateStaticMethod = function _privateStaticMethod() {};
