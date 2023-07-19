var _class;
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
_class = Sub;
function _subStaticPrivateMethod() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_class), "basePublicStaticMethod", this).call(this);
}
