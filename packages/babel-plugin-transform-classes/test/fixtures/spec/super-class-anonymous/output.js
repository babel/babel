var TestEmpty =
/*#__PURE__*/
function (_ref) {
  "use strict";

  function TestEmpty() {
    babelHelpers.classCallCheck(this, TestEmpty);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TestEmpty).apply(this, arguments));
  }

  babelHelpers.inherits(TestEmpty, _ref);
  return TestEmpty;
}(
/*#__PURE__*/
function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }

  return _class;
}());

var TestConstructorOnly =
/*#__PURE__*/
function (_ref2) {
  "use strict";

  function TestConstructorOnly() {
    babelHelpers.classCallCheck(this, TestConstructorOnly);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TestConstructorOnly).apply(this, arguments));
  }

  babelHelpers.inherits(TestConstructorOnly, _ref2);
  return TestConstructorOnly;
}(
/*#__PURE__*/
function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }

  return _class2;
}());

var TestMethodOnly =
/*#__PURE__*/
function (_ref3) {
  "use strict";

  function TestMethodOnly() {
    babelHelpers.classCallCheck(this, TestMethodOnly);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TestMethodOnly).apply(this, arguments));
  }

  babelHelpers.inherits(TestMethodOnly, _ref3);
  return TestMethodOnly;
}(
/*#__PURE__*/
function () {
  "use strict";

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
  "use strict";

  function TestConstructorAndMethod() {
    babelHelpers.classCallCheck(this, TestConstructorAndMethod);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TestConstructorAndMethod).apply(this, arguments));
  }

  babelHelpers.inherits(TestConstructorAndMethod, _ref4);
  return TestConstructorAndMethod;
}(
/*#__PURE__*/
function () {
  "use strict";

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
  "use strict";

  function TestMultipleMethods() {
    babelHelpers.classCallCheck(this, TestMultipleMethods);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TestMultipleMethods).apply(this, arguments));
  }

  babelHelpers.inherits(TestMultipleMethods, _ref5);
  return TestMultipleMethods;
}(
/*#__PURE__*/
function () {
  "use strict";

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
