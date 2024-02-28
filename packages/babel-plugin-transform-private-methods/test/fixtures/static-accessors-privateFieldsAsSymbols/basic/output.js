var _Cl;
var _PRIVATE_STATIC_FIELD = Symbol("PRIVATE_STATIC_FIELD");
var _privateStaticFieldValue = Symbol("privateStaticFieldValue");
class Cl {
  static getValue() {
    return babelHelpers.classPrivateFieldLoose(Cl, _privateStaticFieldValue);
  }
  static setValue() {
    babelHelpers.classPrivateFieldLoose(Cl, _privateStaticFieldValue, 1)[_privateStaticFieldValue] = "dank";
  }
}
_Cl = Cl;
function _get_privateStaticFieldValue() {
  return babelHelpers.classPrivateFieldLoose(_Cl, _PRIVATE_STATIC_FIELD);
}
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classPrivateFieldLoose(_Cl, _PRIVATE_STATIC_FIELD, 1)[_PRIVATE_STATIC_FIELD] = `Updated: ${newValue}`;
}
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
});
Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: "top secret string"
});
