class Cl {
  static publicGetPrivateField() {
    return _get_privateFieldValue.call(Cl);
  }
  static publicSetPrivateField(newValue) {
    _set_privateFieldValue.call(Cl, newValue);
  }
  static get publicFieldValue() {
    return Cl.publicField;
  }
  static set publicFieldValue(newValue) {
    Cl.publicField = newValue;
  }
  static testUpdates() {
    var _Cl$privateFieldValue, _Cl$privateFieldValue2, _Cl$privateFieldValue3, _Cl$privateFieldValue4, _Cl$privateFieldValue5;
    _privateField._ = 0;
    Cl.publicField = 0;
    _set_privateFieldValue.call(Cl, (_set_privateFieldValue.call(Cl, (_Cl$privateFieldValue3 = _get_privateFieldValue.call(Cl), _Cl$privateFieldValue4 = _Cl$privateFieldValue3++, _Cl$privateFieldValue3)), _Cl$privateFieldValue4));
    Cl.publicFieldValue = Cl.publicFieldValue++;
    _set_privateFieldValue.call(Cl, (_Cl$privateFieldValue5 = _get_privateFieldValue.call(Cl), ++_Cl$privateFieldValue5));
    ++Cl.publicFieldValue;
    _set_privateFieldValue.call(Cl, _get_privateFieldValue.call(Cl) + 1);
    Cl.publicFieldValue += 1;
    _set_privateFieldValue.call(Cl, -(_get_privateFieldValue.call(Cl) ** _get_privateFieldValue.call(Cl)));
    Cl.publicFieldValue = -(Cl.publicFieldValue ** Cl.publicFieldValue);
  }
}
function _get_privateFieldValue() {
  return _privateField._;
}
function _set_privateFieldValue(newValue) {
  _privateField._ = newValue;
}
var _privateField = {
  _: "top secret string"
};
babelHelpers.defineProperty(Cl, "publicField", "not secret string");
