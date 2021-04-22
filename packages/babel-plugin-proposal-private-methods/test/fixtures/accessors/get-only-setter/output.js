var _privateField = /*#__PURE__*/new WeakMap();

var _privateFieldValue = /*#__PURE__*/new WeakMap();

class Cl {
  constructor() {
    _privateFieldValue.set(this, {
      get: void 0,
      set: _set_privateFieldValue
    });

    _privateField.set(this, {
      writable: true,
      value: 0
    });

    this.publicField = (this, babelHelpers.writeOnlyError("#privateFieldValue"));
  }

}

function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
