class Cl {
  publicMethod(checked) {
    return babelHelpers.assertClassBrand(Cl, checked, _privateStaticMethod).call(checked);
  }
}
function _privateStaticMethod() {}
