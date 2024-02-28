var _privateField = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateField");
var _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: _set_privateFieldValue
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: "top secret string"
    });
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateFieldLoose(this, _privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldLoose(this, _privateFieldValue, 1)[_privateFieldValue] = newValue;
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLoose(this, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldLoose(this, _privateField, 1)[_privateField] = newValue;
}
