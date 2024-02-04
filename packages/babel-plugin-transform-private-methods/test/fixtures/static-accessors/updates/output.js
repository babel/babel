var _Cl;
class Cl {
  static publicGetPrivateField() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue);
  }
  static publicSetPrivateField(newValue) {
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, newValue);
  }
  static get publicFieldValue() {
    return Cl.publicField;
  }
  static set publicFieldValue(newValue) {
    Cl.publicField = newValue;
  }
  static testUpdates() {
    var _Cl$privateFieldValue, _Cl$privateFieldValue2, _Cl$privateFieldValue3, _Cl$privateFieldValue4, _Cl$privateFieldValue5;
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateField, 0);
    Cl.publicField = 0;
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, (babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, (_Cl$privateFieldValue3 = babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue), _Cl$privateFieldValue4 = _Cl$privateFieldValue3++, _Cl$privateFieldValue3)), _Cl$privateFieldValue4));
    Cl.publicFieldValue = Cl.publicFieldValue++;
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, (_Cl$privateFieldValue5 = babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue), ++_Cl$privateFieldValue5));
    ++Cl.publicFieldValue;
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue) + 1);
    Cl.publicFieldValue += 1;
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, -(babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue) ** babelHelpers.classStaticPrivateFieldSpecGet(Cl, Cl, _privateFieldValue)));
    Cl.publicFieldValue = -(Cl.publicFieldValue ** Cl.publicFieldValue);
  }
}
_Cl = Cl;
function _get_privateFieldValue() {
  return babelHelpers.classStaticPrivateFieldSpecGet(_Cl, _Cl, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classStaticPrivateFieldSpecSet(_Cl, _Cl, _privateField, newValue);
}
var _privateFieldValue = {
  get: _get_privateFieldValue,
  set: _set_privateFieldValue
};
var _privateField = {
  writable: true,
  value: "top secret string"
};
babelHelpers.defineProperty(Cl, "publicField", "not secret string");
