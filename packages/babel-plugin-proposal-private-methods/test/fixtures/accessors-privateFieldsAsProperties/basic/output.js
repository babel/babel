var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

class Cl {
  constructor() {
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: _set_privateFieldValue
    });
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: "top secret string"
    });
    this.publicField = "not secret string";
  }

  publicGetPrivateField() {
    return babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
  }

  publicSetPrivateField(newValue) {
    babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = newValue;
  }

}

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
};

var _set_privateFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
};
