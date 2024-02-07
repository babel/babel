class Cl {
  publicMethod(checked) {
    return babelHelpers.assertClassBrand(checked, Cl, _privateStaticMethod).call(checked);
  }
}
function _privateStaticMethod() {}
