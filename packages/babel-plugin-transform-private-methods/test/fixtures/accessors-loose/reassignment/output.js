var counter = 0;
var _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");
class Foo {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: void 0
    });
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = ++counter;
  }
}
function _get_privateFieldValue() {
  return 42;
}
