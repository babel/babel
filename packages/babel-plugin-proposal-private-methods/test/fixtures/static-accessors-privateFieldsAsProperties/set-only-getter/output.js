var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

class Cl {
  constructor() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue] = 1;
    [babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue]] = [1];
  }

}

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
};

Object.defineProperty(Cl, _privateFieldValue, {
  get: _get_privateFieldValue,
  set: void 0
});
Object.defineProperty(Cl, _privateField, {
  writable: true,
  value: 0
});
const cl = new Cl();
