var _Sub;
class Base {
  static basePublicStaticMethod() {
    return 'good';
  }
}
var _subStaticPrivateMethod = Symbol("subStaticPrivateMethod");
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
  return babelHelpers.superPropGet(_Sub, "basePublicStaticMethod", this, 2)([]);
}
Object.defineProperty(Sub, _subStaticPrivateMethod, {
  value: _subStaticPrivateMethod2
});
