class A {
  static get a() {
    return 1;
  }
}
var _getA = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("getA");
var _getB = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("getB");
class B extends A {
  static get b() {
    return 2;
  }
  static extract() {
    return [babelHelpers.assertClassBrandLoose(this, _getA, 1), babelHelpers.assertClassBrandLoose(this, _getB, 1)];
  }
}
function _getA2() {
  return A.a;
}
function _getB2() {
  return this.b;
}
Object.defineProperty(B, _getB, {
  value: _getB2
});
Object.defineProperty(B, _getA, {
  value: _getA2
});
var [getA, getB] = B.extract();
