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
    return [babelHelpers.classStaticPrivateMethodGet(this, B, _getA), babelHelpers.classStaticPrivateMethodGet(this, B, _getB)];
  }
}
function _getA() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(B), "a", this);
}
function _getB() {
  return this.b;
}
var [getA, getB] = B.extract();
