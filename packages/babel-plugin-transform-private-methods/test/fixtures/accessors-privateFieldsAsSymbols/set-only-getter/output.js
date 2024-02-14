var _privateField = /*#__PURE__*/Symbol("privateField");
var _Cl_brand = /*#__PURE__*/Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _Cl_brand, {
      get: _get_privateFieldValue,
      set: void 0
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand] = 1;
    [babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand]] = [1];
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
}
