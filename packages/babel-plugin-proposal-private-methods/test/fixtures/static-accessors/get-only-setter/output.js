class Cl {
  static getPrivateStaticFieldValue() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateStaticFieldValue);
  }

}

var _set_privateStaticFieldValue = function (newValue) {
  babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _PRIVATE_STATIC_FIELD, newValue);
};

var _PRIVATE_STATIC_FIELD = {
  writable: true,
  value: 0
};
var _privateStaticFieldValue = {
  get: void 0,
  set: _set_privateStaticFieldValue
};
