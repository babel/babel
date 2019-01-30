var Cl = function Cl() {
  "use strict";

  babelHelpers.classCallCheck(this, Cl);
  Object.defineProperty(this, _privateFieldValue, {
    set: _set_privateFieldValue
  });
  Object.defineProperty(this, _privateField, {
    writable: true,
    value: 0
  });
  this.publicField = babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
};

var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

var _set_privateFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
};
