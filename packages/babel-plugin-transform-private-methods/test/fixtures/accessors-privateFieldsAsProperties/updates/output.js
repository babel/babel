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
    return babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = newValue;
  }
  get publicFieldValue() {
    return this.publicField;
  }
  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }
  testUpdates() {
    babelHelpers.assertClassBrandLoose(this, _privateField)[_privateField] = 0;
    this.publicField = 0;
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue]++;
    this.publicFieldValue = this.publicFieldValue++;
    ++babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue];
    ++this.publicFieldValue;
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] += 1;
    this.publicFieldValue += 1;
    babelHelpers.assertClassBrandLoose(this, _privateFieldValue)[_privateFieldValue] = -(babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1) ** babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1));
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.assertClassBrandLoose(this, _privateField, 1);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(this, _privateField)[_privateField] = newValue;
}
