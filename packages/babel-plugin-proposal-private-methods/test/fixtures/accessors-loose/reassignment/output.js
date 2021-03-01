var counter = 0;

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

class Foo {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: void 0
    });
    babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = ++counter;
  }

}

var _get_privateFieldValue = function () {
  return 42;
};
