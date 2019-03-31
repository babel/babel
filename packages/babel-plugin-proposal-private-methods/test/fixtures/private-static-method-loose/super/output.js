class Base {
  static basePublicStaticMethod() {
    return 'good';
  }

}

class Sub extends Base {
  static check() {
    babelHelpers.classPrivateFieldLooseBase(Sub, _subStaticPrivateMethod)[_subStaticPrivateMethod]();
  }

}

var _subStaticPrivateMethod = babelHelpers.classPrivateFieldLooseKey("subStaticPrivateMethod");

var _subStaticPrivateMethod2 = function _subStaticPrivateMethod2() {
  return Base.basePublicStaticMethod.call(this);
};

Object.defineProperty(Sub, _subStaticPrivateMethod, {
  value: _subStaticPrivateMethod2
});
