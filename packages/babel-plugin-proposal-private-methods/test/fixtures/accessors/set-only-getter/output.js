var Cl = function Cl() {
  "use strict";

  babelHelpers.classCallCheck(this, Cl);

  _privateField.set(this, {
    writable: true,
    value: 0
  });

  _privateFieldValue.set(this, {
    get: _get_privateFieldValue
  });

  babelHelpers.classPrivateMethodSet();
};

var _privateField = new WeakMap();

var _privateFieldValue = new WeakMap();

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
};
