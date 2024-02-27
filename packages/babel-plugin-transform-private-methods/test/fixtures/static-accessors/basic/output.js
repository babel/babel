class Cl {
  static getValue() {
    return _get_privateStaticFieldValue(Cl);
  }
  static setValue() {
    _set_privateStaticFieldValue(Cl, "dank");
  }
}
function _get_privateStaticFieldValue(_this) {
  return _PRIVATE_STATIC_FIELD._;
}
function _set_privateStaticFieldValue(_this2, newValue) {
  _PRIVATE_STATIC_FIELD._ = `Updated: ${newValue}`;
}
var _PRIVATE_STATIC_FIELD = {
  _: "top secret string"
};
