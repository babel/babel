var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _privateField, {
      writable: true,
      value: "top secret string"
    });
    Object.defineProperty(this, _privateFieldValue, {
      get: _get_privateFieldValue,
      set: _set_privateFieldValue
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "publicGetPrivateField",
    value: function publicGetPrivateField() {
      return babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
    }
  }, {
    key: "publicSetPrivateField",
    value: function publicSetPrivateField(newValue) {
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = newValue;
    }
  }, {
    key: "testUpdates",
    value: function testUpdates() {
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue]++;
      ++babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
      --babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue]--;
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue]++;
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = ++babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue];
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] += 1;
      babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] = -(babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue] ** babelHelpers.classPrivateFieldLooseBase(this, _privateFieldValue)[_privateFieldValue]);
    }
  }]);
  return Foo;
}();

var _privateField = babelHelpers.classPrivateFieldLooseKey("privateField");

var _privateFieldValue = babelHelpers.classPrivateFieldLooseKey("privateFieldValue");

var _get_privateFieldValue = function () {
  return babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField];
};

var _set_privateFieldValue = function (newValue) {
  babelHelpers.classPrivateFieldLooseBase(this, _privateField)[_privateField] = newValue;
};
