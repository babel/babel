var _Cl;
var _privateField = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateField");
var _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");
class Cl {
  static publicGetPrivateField() {
    return babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue);
  }
  static publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue] = newValue;
  }
  static get publicFieldValue() {
    return Cl.publicField;
  }
  static set publicFieldValue(newValue) {
    Cl.publicField = newValue;
  }
  static testUpdates() {
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateField, 1)[_privateField] = 0;
    Cl.publicField = 0;
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue] = babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue]++;
    Cl.publicFieldValue = Cl.publicFieldValue++;
    ++babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue];
    ++Cl.publicFieldValue;
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue] += 1;
    Cl.publicFieldValue += 1;
    babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue, 1)[_privateFieldValue] = -(babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue) ** babelHelpers.classPrivateFieldGetLoose(Cl, _privateFieldValue));
    Cl.publicFieldValue = -(Cl.publicFieldValue ** Cl.publicFieldValue);
  }
}
_Cl = Cl;
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGetLoose(_Cl, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldGetLoose(_Cl, _privateField, 1)[_privateField] = newValue;
}
Object.defineProperty(Cl, _privateFieldValue, {
  get: _get_privateFieldValue,
  set: _set_privateFieldValue
});
Object.defineProperty(Cl, _privateField, {
  writable: true,
  value: "top secret string"
});
Cl.publicField = "not secret string";
