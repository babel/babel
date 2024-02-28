var _Cl;
var _PRIVATE_STATIC_FIELD = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("PRIVATE_STATIC_FIELD");
var _privateStaticFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateStaticFieldValue");
class Cl {
  static getPrivateStaticFieldValue() {
    return babelHelpers.classPrivateFieldLoose(Cl, _privateStaticFieldValue);
  }
}
_Cl = Cl;
function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classPrivateFieldLoose(_Cl, _PRIVATE_STATIC_FIELD, 1)[_PRIVATE_STATIC_FIELD] = newValue;
}
Object.defineProperty(Cl, _privateStaticFieldValue, {
  get: void 0,
  set: _set_privateStaticFieldValue
});
Object.defineProperty(Cl, _PRIVATE_STATIC_FIELD, {
  writable: true,
  value: 0
});
