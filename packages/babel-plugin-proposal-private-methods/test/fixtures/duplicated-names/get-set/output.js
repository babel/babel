var _privateField = /*#__PURE__*/new WeakMap();

var _getSet = /*#__PURE__*/new WeakMap();

class Cl {
  constructor() {
    _getSet.set(this, {
      get: _get_getSet,
      set: _set_getSet
    });

    _privateField.set(this, {
      writable: true,
      value: 0
    });
  }

}

function _get_getSet() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}

function _set_getSet(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
