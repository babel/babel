class Base {
  static basePublicStaticMethod() {
    return 1017;
  }

}

class Sub extends Base {
  static check() {
    babelHelpers.classStaticPrivateMethodGet(Sub, Sub, _subStaticPrivateMethod).call(Sub);
  }

}

var _subStaticPrivateMethod = function _subStaticPrivateMethod() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(Sub), "basePublicStaticMethod", this).call(this);
};
