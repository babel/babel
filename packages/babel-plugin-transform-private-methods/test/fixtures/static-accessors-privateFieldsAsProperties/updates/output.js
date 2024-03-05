var _Cl;
var _privateField = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateField");
var _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");
class Cl {
  static publicGetPrivateField() {
    return babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue, 1);
  }
  static publicSetPrivateField(newValue) {
    babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue] = newValue;
  }
  static get publicFieldValue() {
    return Cl.publicField;
  }
  static set publicFieldValue(newValue) {
    Cl.publicField = newValue;
  }
  static testUpdates() {
    babelHelpers.assertClassBrandLoose(Cl, _privateField)[_privateField] = 0;
    Cl.publicField = 0;
    babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue] = babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue]++;
    Cl.publicFieldValue = Cl.publicFieldValue++;
    ++babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue];
    ++Cl.publicFieldValue;
    babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue] += 1;
    Cl.publicFieldValue += 1;
    babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue)[_privateFieldValue] = -(babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue, 1) ** babelHelpers.assertClassBrandLoose(Cl, _privateFieldValue, 1));
    Cl.publicFieldValue = -(Cl.publicFieldValue ** Cl.publicFieldValue);
  }
}
_Cl = Cl;
function _get_privateFieldValue() {
  return babelHelpers.assertClassBrandLoose(_Cl, _privateField, 1);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(_Cl, _privateField)[_privateField] = newValue;
}
Object.defineProperty(Cl, _privateFieldValue, {
  get: _get_privateFieldValue,
  set: _set_privateFieldValue
});
Object.defineProperty(Cl, _privateField, {
  writable: true,
  value: "top secret string"
});
babelHelpers.defineProperty(Cl, "publicField", "not secret string");
