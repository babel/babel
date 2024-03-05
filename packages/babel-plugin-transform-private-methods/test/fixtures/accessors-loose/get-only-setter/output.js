var _privateField = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateField");
var _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: void 0,
      set: _set_privateFieldValue
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    this.publicField = babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1);
  }
}
function _set_privateFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(this, _privateField)[_privateField] = newValue;
}
