var _privateField = Symbol("privateField");
var _privateFieldValue = Symbol("privateFieldValue");
class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: void 0
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: 0
    });
    babelHelpers.classPrivateFieldLoose(this, _privateFieldValue, 1)[_privateFieldValue] = 1;
    [babelHelpers.classPrivateFieldLoose(this, _privateFieldValue, 1)[_privateFieldValue]] = [1];
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLoose(this, _privateField);
}
