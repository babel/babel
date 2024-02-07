class Cl {
  static getValue() {
    return _get_privateStaticFieldValue.call(Cl);
  }
  static setValue() {
    _set_privateStaticFieldValue.call(Cl, "dank");
  }
}
function _get_privateStaticFieldValue() {
  return _PRIVATE_STATIC_FIELD._;
}
function _set_privateStaticFieldValue(newValue) {
  _PRIVATE_STATIC_FIELD._ = `Updated: ${newValue}`;
}
var _PRIVATE_STATIC_FIELD = {
  _: "top secret string"
};
