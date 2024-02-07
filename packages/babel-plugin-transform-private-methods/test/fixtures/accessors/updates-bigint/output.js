var _privateField = /*#__PURE__*/new WeakMap();
var _privateFieldValue = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _privateFieldValue);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, "top secret string");
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, newValue);
  }
  get publicFieldValue() {
    return this.publicField;
  }
  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }
  testUpdates() {
    var _this$privateFieldVal, _this$privateFieldVal2, _this$privateFieldVal3, _this$privateFieldVal4, _this$privateFieldVal5;
    babelHelpers.classPrivateFieldSet2(this, _privateField, 0n);
    this.publicField = 0n;
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, (babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, (_this$privateFieldVal3 = babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue), _this$privateFieldVal4 = _this$privateFieldVal3++, _this$privateFieldVal3)), _this$privateFieldVal4));
    this.publicFieldValue = this.publicFieldValue++;
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, (_this$privateFieldVal5 = babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue), ++_this$privateFieldVal5));
    ++this.publicFieldValue;
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue) + 1n);
    this.publicFieldValue += 1n;
    babelHelpers.classPrivateSetter(this, _privateFieldValue, _set_privateFieldValue, -(babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue) ** babelHelpers.classPrivateGetter(this, _privateFieldValue, _get_privateFieldValue)));
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet2(this, _privateField, newValue);
}
