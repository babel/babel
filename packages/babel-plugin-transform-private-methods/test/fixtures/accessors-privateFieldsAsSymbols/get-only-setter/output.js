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
    this.publicField = babelHelpers.assertClassBrandLoose(this, _privateFieldValue, 1);
  }
}
function _set_privateFieldValue(newValue) {
  babelHelpers.assertClassBrandLoose(this, _privateField)[_privateField] = newValue;
}
