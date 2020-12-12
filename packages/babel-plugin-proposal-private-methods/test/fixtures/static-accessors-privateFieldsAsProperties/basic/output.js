var _PRIVATE_STATIC_FIELD = babelHelpers.classPrivateFieldLooseKey("PRIVATE_STATIC_FIELD");

var _privateStaticFieldValue = babelHelpers.classPrivateFieldLooseKey("privateStaticFieldValue");

class Cl {
  static getValue() {
    return babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue];
  }

  static setValue() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue] = "dank";
  }

}

var _set_privateStaticFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD] = `Updated: ${newValue}`;
};

var _get_privateStaticFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD];
};

Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: "top secret string"
});
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: _get_privateStaticFieldValue,
  set: _set_privateStaticFieldValue
});
