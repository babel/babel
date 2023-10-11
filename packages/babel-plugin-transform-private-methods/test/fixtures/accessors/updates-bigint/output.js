var _privateField = /*#__PURE__*/new WeakMap();
var _privateFieldValue = /*#__PURE__*/new WeakMap();
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: _set_privateFieldValue
    });
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, {
      writable: true,
      value: "top secret string"
    });
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateFieldGet(this, _privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, newValue);
  }
  get publicFieldValue() {
    return this.publicField;
  }
  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }
  testUpdates() {
    var _this$privateFieldVal, _this$privateFieldVal2, _this$privateFieldVal3, _this$privateFieldVal4, _this$privateFieldVal5;
    babelHelpers.classPrivateFieldSet(this, _privateField, 0n);
    this.publicField = 0n;
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, (babelHelpers.classPrivateFieldSet(this, _privateFieldValue, (_this$privateFieldVal3 = babelHelpers.classPrivateFieldGet(this, _privateFieldValue), _this$privateFieldVal4 = _this$privateFieldVal3++, _this$privateFieldVal3)), _this$privateFieldVal4));
    this.publicFieldValue = this.publicFieldValue++;
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, (_this$privateFieldVal5 = babelHelpers.classPrivateFieldGet(this, _privateFieldValue), ++_this$privateFieldVal5));
    ++this.publicFieldValue;
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, babelHelpers.classPrivateFieldGet(this, _privateFieldValue) + 1n);
    this.publicFieldValue += 1n;
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, -(babelHelpers.classPrivateFieldGet(this, _privateFieldValue) ** babelHelpers.classPrivateFieldGet(this, _privateFieldValue)));
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
