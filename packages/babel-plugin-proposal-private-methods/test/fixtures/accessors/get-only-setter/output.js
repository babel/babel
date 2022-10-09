var _privateField = /*#__PURE__*/new WeakMap();
var _privateFieldValue = /*#__PURE__*/new WeakMap();
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _privateFieldValue, {
      get: void 0,
      set: _set_privateFieldValue
    });
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, {
      writable: true,
      value: 0
    });
    this.publicField = (this, babelHelpers.writeOnlyError("#privateFieldValue"));
  }
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
