class Cl {
  static getPrivateStaticFieldValue() {
    return babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue];
  }

}

var _PRIVATE_STATIC_FIELD = babelHelpers.classPrivateFieldLooseKey("PRIVATE_STATIC_FIELD");

var _privateStaticFieldValue = babelHelpers.classPrivateFieldLooseKey("privateStaticFieldValue");

var _set_privateStaticFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD] = newValue;
};

Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: 0
});
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: void 0,
  set: _set_privateStaticFieldValue
});
