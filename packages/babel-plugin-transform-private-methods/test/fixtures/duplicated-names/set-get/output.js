var _privateField = /*#__PURE__*/new WeakMap();
var _getSet = /*#__PURE__*/new WeakSet();
class Cl {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _getSet);
    babelHelpers.classPrivateFieldInitSpec(this, _privateField, 0);
  }
}
function _set_getSet(newValue) {
  babelHelpers.classPrivateFieldSet2(this, _privateField, newValue);
}
function _get_getSet() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}
