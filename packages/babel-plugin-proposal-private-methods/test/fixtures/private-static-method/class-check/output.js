class Cl {
  publicMethod(checked) {
    return babelHelpers.classStaticPrivateMethodGet(checked, Cl, _privateStaticMethod).call(checked);
  }

}

var _privateStaticMethod = function _privateStaticMethod() {};
