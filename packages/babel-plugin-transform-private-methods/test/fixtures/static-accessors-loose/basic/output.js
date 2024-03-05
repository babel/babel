var _Cl;
var _PRIVATE_STATIC_FIELD = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("PRIVATE_STATIC_FIELD");
var _privateStaticFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateStaticFieldValue");
class Cl {
  static getValue() {
    return babelHelpers.assertClassBrandLoose(Cl, _privateStaticFieldValue, 1);
  }
  static setValue() {
    babelHelpers.assertClassBrandLoose(Cl, _privateStaticFieldValue)[_privateStaticFieldValue] = "dank";
  }
}
_Cl = Cl;
function _get_privateStaticFieldValue() {
  return babelHelpers.assertClassBrandLoose(_Cl, _PRIVATE_STATIC_FIELD, 1);
}
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(_Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD] = `Updated: ${newValue}`;
}
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
});
Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: "top secret string"
});
