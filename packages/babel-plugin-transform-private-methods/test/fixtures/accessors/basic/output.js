var _privateField = /*#__PURE__*/new WeakMap();
var _privateFieldValue = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _privateFieldValue);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, "top secret string");
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, newValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet2(this, _privateField, newValue);
}
