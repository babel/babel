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
    return babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue] = newValue;
  }
  get publicFieldValue() {
    return this.publicField;
  }
  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }
  testUpdates() {
    babelHelpers.classPrivateFieldGetLoose(this, _privateField, 1)[_privateField] = 0;
    this.publicField = 0;
    babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue] = babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue]++;
    this.publicFieldValue = this.publicFieldValue++;
    ++babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue];
    ++this.publicFieldValue;
    babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue] += 1;
    this.publicFieldValue += 1;
    babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue, 1)[_privateFieldValue] = -(babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue) ** babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue));
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGetLoose(this, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldGetLoose(this, _privateField, 1)[_privateField] = newValue;
}
