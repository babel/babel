var _Sub;
class Base {
  static basePublicStaticMethod() {
    return 'good';
  }
}
class Sub extends Base {
  static basePublicStaticMethod() {
    return 'bad';
  }
  static check() {
    _subStaticPrivateMethod.call(Sub);
  }
}
_Sub = Sub;
function _subStaticPrivateMethod() {
  return babelHelpers.superPropertyGetCall(_Sub, "basePublicStaticMethod", this, 0, []);
}
