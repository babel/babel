var _privateField = Symbol("privateField");
var _privateFieldValue = Symbol("privateFieldValue");
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
