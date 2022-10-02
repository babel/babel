var _privateField = /*#__PURE__*/new WeakMap();
var _getSet = /*#__PURE__*/new WeakMap();
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _getSet, {
      get: _get_getSet,
      set: _set_getSet
    });
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, {
      writable: true,
      value: 0
    });
  }
}
function _set_getSet(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
function _get_getSet() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}
