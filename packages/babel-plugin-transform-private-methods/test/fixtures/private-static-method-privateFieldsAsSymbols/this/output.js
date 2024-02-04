var _B;
class A {
  static get a() {
    return 1;
  }
}
var _getA = /*#__PURE__*/Symbol("getA");
var _getB = /*#__PURE__*/Symbol("getB");
class B extends A {
  static get b() {
    return 2;
  }
  static extract() {
    return [babelHelpers.classPrivateFieldLooseBase(this, _getA)[_getA], babelHelpers.classPrivateFieldLooseBase(this, _getB)[_getB]];
  }
}
_B = B;
function _getA2() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_B), "a", this);
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
const [getA, getB] = B.extract();
