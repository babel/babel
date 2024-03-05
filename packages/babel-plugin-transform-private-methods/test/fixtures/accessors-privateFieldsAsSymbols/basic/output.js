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
    return babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = newValue;
  }
}
function _get_privateFieldValue() {
  return babelHelpers.assertClassBrandLoose(this, _privateField, 1);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(this, _privateField)[_privateField] = newValue;
}
