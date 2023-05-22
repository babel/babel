class Cl {
  publicMethod(checked) {
    return babelHelpers.classStaticPrivateMethodGet(checked, Cl, _privateStaticMethod).call(checked);
  }
}
function _privateStaticMethod() {}
