var Cl = function Cl() {
  "use strict";

  babelHelpers.classCallCheck(this, Cl);

  _privateField.set(this, {
    writable: true,
    value: 0
  });

  _privateFieldValue.set(this, {
    set: _set_privateFieldValue
  });

  this.publicField = babelHelpers.classPrivateFieldGet(this, _privateFieldValue);
};

var _privateField = new WeakMap();

var _privateFieldValue = new WeakMap();

var _set_privateFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
};
