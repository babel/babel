var Cl = function Cl() {
  "use strict";

  babelHelpers.classCallCheck(this, Cl);
  Object.defineProperty(this, _privateField, {
    writable: true,
    value: 0
  });
  Object.defineProperty(this, _privateFieldValue, {
    get: _get_privateFieldValue
  });
  babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = 1;
};

var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
};
