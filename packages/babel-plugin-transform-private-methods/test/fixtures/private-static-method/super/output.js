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
    babelHelpers.classStaticPrivateMethodGet(Sub, Sub, _subStaticPrivateMethod).call(Sub);
  }
}
_Sub = Sub;
function _subStaticPrivateMethod() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_Sub), "basePublicStaticMethod", this).call(this);
}
