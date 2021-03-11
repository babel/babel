var _privateMethod = babelHelpers.classPrivateFieldLooseKey("privateMethod");

class X {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
  }

}

function _privateMethod2() {
  return 42;
}
