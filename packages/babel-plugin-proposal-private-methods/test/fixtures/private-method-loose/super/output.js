class Base {
  superMethod() {
    return 1017;
  }

}

class Sub extends Base {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
  }

  publicMethod() {
    return babelHelpers.classPrivateFieldLooseBase(this, _privateMethod)[_privateMethod]();
  }

}

var _privateMethod = babelHelpers.classPrivateFieldLooseKey("privateMethod");

var _privateMethod2 = function _privateMethod2() {
  return Base.prototype.superMethod.call(this);
};
