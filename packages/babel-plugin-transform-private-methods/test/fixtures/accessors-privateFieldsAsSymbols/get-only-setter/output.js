var _privateField = Symbol("privateField");
var _privateFieldValue = Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: void 0,
      set: _set_privateFieldValue
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    this.publicField = babelHelpers.classPrivateFieldGetLoose(this, _privateFieldValue);
  }
}
function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldGetLoose(this, _privateField, 1)[_privateField] = newValue;
}
