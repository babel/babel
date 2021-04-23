var _privateField = /*#__PURE__*/new WeakMap();

var _privateFieldValue = /*#__PURE__*/new WeakMap();

class Cl {
  constructor() {
    _privateFieldValue.set(this, {
      get: _get_privateFieldValue,
      set: _set_privateFieldValue
    });

    _privateField.set(this, {
      writable: true,
      value: "top secret string"
    });

    this.publicField = "not secret string";
  }

  publicGetPrivateField() {
    return babelHelpers.classPrivateFieldGet(this, _privateFieldValue);
  }

  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldSet(this, _privateFieldValue, newValue);
  }

}

function _get_privateFieldValue() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}

function _set_privateFieldValue(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}
