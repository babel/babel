var _privateField = /*#__PURE__*/Symbol("privateField");
var _Cl_brand = /*#__PURE__*/Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _Cl_brand, {
      get: void 0,
      set: _set_privateFieldValue
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    this.publicField = babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand];
  }
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
}
