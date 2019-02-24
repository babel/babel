class Cl {
  static check() {
    return babelHelpers.classStaticPrivateMethodGet(this, Cl, _staticPrivateMethod).call(this);
  }

}

babelHelpers.defineProperty(Cl, "staticField", 'staticFieldString');

var _staticPrivateMethod = function _staticPrivateMethod() {
  return Cl.staticField;
};
