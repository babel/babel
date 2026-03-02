var _privateField = Symbol("privateField");
var _privateFieldValue = Symbol("privateFieldValue");
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue] = 1;
    [babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue]] = [1];
  }
}
function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
}
Object.defineProperty(Cl, _privateFieldValue, {
  get: _get_privateFieldValue,
  set: void 0
});
Object.defineProperty(Cl, _privateField, {
  writable: true,
  value: 0
});
const cl = new Cl();
