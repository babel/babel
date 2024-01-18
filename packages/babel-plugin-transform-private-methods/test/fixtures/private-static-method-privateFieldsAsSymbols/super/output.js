var _Sub;
class Base {
  static basePublicStaticMethod() {
    return 'good';
  }
}
var _subStaticPrivateMethod = /*#__PURE__*/Symbol("subStaticPrivateMethod");
class Sub extends Base {
  static basePublicStaticMethod() {
    return 'bad';
  }
  static check() {
    babelHelpers.classPrivateFieldLooseBase(Sub, _subStaticPrivateMethod)[_subStaticPrivateMethod]();
  }
}
_Sub = Sub;
function _subStaticPrivateMethod2() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_Sub), "basePublicStaticMethod", this).call(this);
}
Object.defineProperty(Sub, _subStaticPrivateMethod, {
  value: _subStaticPrivateMethod2
});
