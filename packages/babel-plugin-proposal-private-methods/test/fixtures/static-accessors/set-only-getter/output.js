class Cl {
  static setPrivateStaticFieldValue() {
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateStaticFieldValue, 1);
  }

}

var _get_privateStaticFieldValue = function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _PRIVATE_STATIC_FIELD);
};

var _PRIVATE_STATIC_FIELD = {
  writable: true,
  value: 0
};
var _privateStaticFieldValue = {
  get: _get_privateStaticFieldValue,
  set: null
};
