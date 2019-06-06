var exfiltrated;

class Foo {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });

    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateFieldLooseBase(this, _privateMethod)[_privateMethod];
    }
  }

}

var _privateMethod = babelHelpers.classPrivateFieldLooseKey("privateMethod");

var _privateMethod2 = function _privateMethod2() {};
