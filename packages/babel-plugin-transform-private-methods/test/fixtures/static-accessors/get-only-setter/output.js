var _Cl;
class Cl {
  static getPrivateStaticFieldValue() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateStaticFieldValue);
  }
}
_Cl = Cl;
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classStaticPrivateFieldSpecSet(_Cl, _Cl, _PRIVATE_STATIC_FIELD, newValue);
}
var _privateStaticFieldValue = {
  get: void 0,
  set: _set_privateStaticFieldValue
};
var _PRIVATE_STATIC_FIELD = {
  writable: true,
  value: 0
};
