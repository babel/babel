var _privateField = /*#__PURE__*/new WeakMap();
var _Cl_brand = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Cl_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, 0);
    this.publicField = (this, babelHelpers.writeOnlyError("#privateFieldValue"));
  }
}
function _set_privateFieldValue(_this, newValue) {
  babelHelpers.classPrivateFieldSet2(_privateField, _this, newValue);
}
