var _privateField = /*#__PURE__*/new WeakMap(),
    _getSet = /*#__PURE__*/new WeakSet();

class Cl {
  constructor() {
    _getSet.add(this);

    _privateField.set(this, 0);
  }

}

function _get_getSet() {
  return babelHelpers.classPrivateFieldGet2(this, _privateField);
}

function _set_getSet(newValue) {
  babelHelpers.classPrivateFieldSet2(this, _privateField, newValue);
}
