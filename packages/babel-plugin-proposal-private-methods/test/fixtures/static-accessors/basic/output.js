class Cl {
  static getValue() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateStaticFieldValue);
  }
  static setValue() {
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateStaticFieldValue, "dank");
  }
}
function _get_privateStaticFieldValue() {
  return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _PRIVATE_STATIC_FIELD);
}
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _PRIVATE_STATIC_FIELD, `Updated: ${newValue}`);
}
var _privateStaticFieldValue = {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
};
var _PRIVATE_STATIC_FIELD = {
  writable: true,
  value: "top secret string"
};
