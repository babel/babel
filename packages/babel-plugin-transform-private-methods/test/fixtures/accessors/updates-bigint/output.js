var _privateField = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, "top secret string");
    this.publicField = "not secret string";
  }
  publicGetPrivateField() {
    return babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue);
  }
  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, newValue);
  }
  get publicFieldValue() {
    return this.publicField;
  }
  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }
  testUpdates() {
    var _this$privateFieldVal, _this$privateFieldVal2, _this$privateFieldVal3, _this$privateFieldVal4, _this$privateFieldVal5;
    babelHelpers.classPrivateFieldSet2(_privateField, this, 0n);
    this.publicField = 0n;
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, (babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, (_this$privateFieldVal3 = babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue), _this$privateFieldVal4 = _this$privateFieldVal3++, _this$privateFieldVal3)), _this$privateFieldVal4));
    this.publicFieldValue = this.publicFieldValue++;
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, (_this$privateFieldVal5 = babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue), ++_this$privateFieldVal5));
    ++this.publicFieldValue;
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue) + 1n);
    this.publicFieldValue += 1n;
    babelHelpers.classPrivateSetter(_Cl_brand, _set_privateFieldValue, this, -(babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue) ** babelHelpers.classPrivateGetter(_Cl_brand, this, _get_privateFieldValue)));
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}
function _get_privateFieldValue(_this) {
  return babelHelpers.classPrivateFieldGet2(_privateField, _this);
}
function _set_privateFieldValue(_this2, newValue) {
  babelHelpers.classPrivateFieldSet2(_privateField, _this2, newValue);
}
