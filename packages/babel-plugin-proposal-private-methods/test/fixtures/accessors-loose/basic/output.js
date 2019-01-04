var Cl =
/*#__PURE__*/
function () {
  "use strict";

  function Cl() {
    babelHelpers.classCallCheck(this, Cl);
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

  babelHelpers.createClass(Cl, [{
    key: "publicGetPrivateField",
    value: function publicGetPrivateField() {
      return babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
    }
  }, {
    key: "publicSetPrivateField",
    value: function publicSetPrivateField(newValue) {
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = newValue;
    }
  }]);
  return Cl;
}();

var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
};

var _set_privateFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
};
