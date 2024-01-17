var _Cl;
var _PRIVATE_STATIC_FIELD = /*#__PURE__*/Symbol("PRIVATE_STATIC_FIELD");
var _privateStaticFieldValue = /*#__PURE__*/Symbol("privateStaticFieldValue");
class Cl {
  static getValue() {
    return babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue];
  }
  static setValue() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue] = "dank";
  }
}
_Cl = Cl;
function _get_privateStaticFieldValue() {
  return babelHelpers.classPrivateFieldLooseBase(_Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD];
}
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classPrivateFieldLooseBase(_Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD] = `Updated: ${newValue}`;
}
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
});
Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: "top secret string"
});
