class Cl {
  static getValue() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateStaticFieldValue);
  }

  static setValue() {
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateStaticFieldValue, "dank");
  }

}

var _set_privateStaticFieldValue = function (newValue) {
  babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _PRIVATE_STATIC_FIELD, `Updated: ${newValue}`);
};

var _get_privateStaticFieldValue = function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _PRIVATE_STATIC_FIELD);
};

var _PRIVATE_STATIC_FIELD = {
  writable: true,
  value: "top secret string"
};
var _privateStaticFieldValue = {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
};
