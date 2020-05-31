var _PRIVATE_STATIC_FIELD = babelHelpers.classPrivateFieldLooseKey("PRIVATE_STATIC_FIELD");

var _privateStaticFieldValue = babelHelpers.classPrivateFieldLooseKey("privateStaticFieldValue");

class Cl {
  static setPrivateStaticFieldValue() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticFieldValue)[_privateStaticFieldValue] = 1;
  }

}

var _get_privateStaticFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(Cl, _PRIVATE_STATIC_FIELD)[_PRIVATE_STATIC_FIELD];
};

Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: 0
});
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: _get_privateStaticFieldValue,
  set: void 0
});
