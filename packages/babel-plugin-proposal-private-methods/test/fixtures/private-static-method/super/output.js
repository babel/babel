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

var _subStaticPrivateMethod = function _subStaticPrivateMethod() {
  var _thisSuper;

  return babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(Sub)), "basePublicStaticMethod", _thisSuper).call(_thisSuper);
};
