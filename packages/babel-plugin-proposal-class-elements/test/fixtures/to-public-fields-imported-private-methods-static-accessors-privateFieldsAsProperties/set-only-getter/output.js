var _privateField = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateField"),
    _privateFieldValue = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

class Cl {
  constructor() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue] = 1;
    [babelHelpers.classPrivateFieldLooseBase(Cl, _privateFieldValue)[_privateFieldValue]] = [1];
  }

}

Object.defineProperty(Cl, _privateFieldValue, {
  get: _get_privateFieldValue,
  set: void 0
});
Object.defineProperty(Cl, _privateField, {
  writable: true,
  value: 0
});

function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
}

const cl = new Cl();
