"use strict";

var TestEmpty = (function (_ref) {
  babelHelpers.inherits(TestEmpty, _ref);

  function TestEmpty() {
    babelHelpers.classCallCheck(this, TestEmpty);
    babelHelpers.get(Object.getPrototypeOf(TestEmpty.prototype), "constructor", this).apply(this, arguments);
  }

  return TestEmpty;
})((function () {
  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }

  return _class;
})());

var TestConstructorOnly = (function (_ref2) {
  babelHelpers.inherits(TestConstructorOnly, _ref2);

  function TestConstructorOnly() {
    babelHelpers.classCallCheck(this, TestConstructorOnly);
    babelHelpers.get(Object.getPrototypeOf(TestConstructorOnly.prototype), "constructor", this).apply(this, arguments);
  }

  return TestConstructorOnly;
})((function () {
  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }

  return _class2;
})());

var TestMethodOnly = (function (_ref3) {
  babelHelpers.inherits(TestMethodOnly, _ref3);

  function TestMethodOnly() {
    babelHelpers.classCallCheck(this, TestMethodOnly);
    babelHelpers.get(Object.getPrototypeOf(TestMethodOnly.prototype), "constructor", this).apply(this, arguments);
  }

  return TestMethodOnly;
})((function () {
  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }

  babelHelpers.createClass(_class3, [{
    key: "method",
    value: function method() {}
  }]);
  return _class3;
})());

var TestConstructorAndMethod = (function (_ref4) {
  babelHelpers.inherits(TestConstructorAndMethod, _ref4);

  function TestConstructorAndMethod() {
    babelHelpers.classCallCheck(this, TestConstructorAndMethod);
    babelHelpers.get(Object.getPrototypeOf(TestConstructorAndMethod.prototype), "constructor", this).apply(this, arguments);
  }

  return TestConstructorAndMethod;
})((function () {
  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }

  babelHelpers.createClass(_class4, [{
    key: "method",
    value: function method() {}
  }]);
  return _class4;
})());

var TestMultipleMethods = (function (_ref5) {
  babelHelpers.inherits(TestMultipleMethods, _ref5);

  function TestMultipleMethods() {
    babelHelpers.classCallCheck(this, TestMultipleMethods);
    babelHelpers.get(Object.getPrototypeOf(TestMultipleMethods.prototype), "constructor", this).apply(this, arguments);
  }

  return TestMultipleMethods;
})((function () {
  function _class5() {
    babelHelpers.classCallCheck(this, _class5);
  }

  babelHelpers.createClass(_class5, [{
    key: "m1",
    value: function m1() {}
  }, {
    key: "m2",
    value: function m2() {}
  }]);
  return _class5;
})());
