var TestEmpty =
/*#__PURE__*/
function (_ref) {
  babelHelpers.inherits(TestEmpty, _ref);

  function TestEmpty() {
    babelHelpers.classCallCheck(this, TestEmpty);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(TestEmpty, Array.prototype.slice.call(arguments), this));
  }

  return TestEmpty;
}(
/*#__PURE__*/
function () {
  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }

  return _class;
}());

var TestConstructorOnly =
/*#__PURE__*/
function (_ref2) {
  babelHelpers.inherits(TestConstructorOnly, _ref2);

  function TestConstructorOnly() {
    babelHelpers.classCallCheck(this, TestConstructorOnly);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(TestConstructorOnly, Array.prototype.slice.call(arguments), this));
  }

  return TestConstructorOnly;
}(
/*#__PURE__*/
function () {
  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }

  return _class2;
}());

var TestMethodOnly =
/*#__PURE__*/
function (_ref3) {
  babelHelpers.inherits(TestMethodOnly, _ref3);

  function TestMethodOnly() {
    babelHelpers.classCallCheck(this, TestMethodOnly);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(TestMethodOnly, Array.prototype.slice.call(arguments), this));
  }

  return TestMethodOnly;
}(
/*#__PURE__*/
function () {
  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }

  babelHelpers.createClass(_class3, [{
    key: "method",
    value: function method() {}
  }]);
  return _class3;
}());

var TestConstructorAndMethod =
/*#__PURE__*/
function (_ref4) {
  babelHelpers.inherits(TestConstructorAndMethod, _ref4);

  function TestConstructorAndMethod() {
    babelHelpers.classCallCheck(this, TestConstructorAndMethod);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(TestConstructorAndMethod, Array.prototype.slice.call(arguments), this));
  }

  return TestConstructorAndMethod;
}(
/*#__PURE__*/
function () {
  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }

  babelHelpers.createClass(_class4, [{
    key: "method",
    value: function method() {}
  }]);
  return _class4;
}());

var TestMultipleMethods =
/*#__PURE__*/
function (_ref5) {
  babelHelpers.inherits(TestMultipleMethods, _ref5);

  function TestMultipleMethods() {
    babelHelpers.classCallCheck(this, TestMultipleMethods);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(TestMultipleMethods, Array.prototype.slice.call(arguments), this));
  }

  return TestMultipleMethods;
}(
/*#__PURE__*/
function () {
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
}());
