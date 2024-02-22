var _privateField = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, "top secret string");
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, newValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet2(_privateField, this);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet2(_privateField, this, newValue);
}
