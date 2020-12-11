var _privateMethod = babelHelpers.classPrivateFieldLooseKey("privateMethod");

class Foo {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
    this.publicField = babelHelpers.classPrivateFieldLooseBase(this, _privateMethod)[_privateMethod]();
  }

}

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
