var _B;
class A {
  static get a() {
    return 1;
  }
}
class B extends A {
  static get b() {
    return 2;
  }
  static extract() {
    return [babelHelpers.assertClassBrand(B, this, _getA), babelHelpers.assertClassBrand(B, this, _getB)];
  }
}
_B = B;
function _getA() {
  return babelHelpers.superPropGet(_B, "a", this);
}
function _getB() {
  return this.b;
}
var [getA, getB] = B.extract();
