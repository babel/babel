var _privateField = /*#__PURE__*/Symbol("privateField");
var _Cl_brand = /*#__PURE__*/Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _Cl_brand, {
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
    return babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand];
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand] = newValue;
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
}
