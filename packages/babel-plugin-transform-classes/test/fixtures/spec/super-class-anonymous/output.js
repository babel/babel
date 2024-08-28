var TestEmpty = /*#__PURE__*/function (_ref) {
  "use strict";

  function TestEmpty() {
    babelHelpers.classCallCheck(this, TestEmpty);
    return babelHelpers.callSuper(this, TestEmpty, arguments);
  }
  babelHelpers.inherits(TestEmpty, _ref);
  return babelHelpers.createClass(TestEmpty);
}(/*#__PURE__*/babelHelpers.createClass(function _class() {
  "use strict";

  babelHelpers.classCallCheck(this, _class);
}));
var TestConstructorOnly = /*#__PURE__*/function (_ref2) {
  "use strict";

  function TestConstructorOnly() {
    babelHelpers.classCallCheck(this, TestConstructorOnly);
    return babelHelpers.callSuper(this, TestConstructorOnly, arguments);
  }
  babelHelpers.inherits(TestConstructorOnly, _ref2);
  return babelHelpers.createClass(TestConstructorOnly);
}(/*#__PURE__*/babelHelpers.createClass(function _class2() {
  "use strict";

  babelHelpers.classCallCheck(this, _class2);
}));
var TestMethodOnly = /*#__PURE__*/function (_ref3) {
  "use strict";

  function TestMethodOnly() {
    babelHelpers.classCallCheck(this, TestMethodOnly);
    return babelHelpers.callSuper(this, TestMethodOnly, arguments);
  }
  babelHelpers.inherits(TestMethodOnly, _ref3);
  return babelHelpers.createClass(TestMethodOnly);
}(/*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  return babelHelpers.createClass(_class3, [{
    key: "method",
    value: function method() {}
  }]);
}());
var TestConstructorAndMethod = /*#__PURE__*/function (_ref4) {
  "use strict";

  function TestConstructorAndMethod() {
    babelHelpers.classCallCheck(this, TestConstructorAndMethod);
    return babelHelpers.callSuper(this, TestConstructorAndMethod, arguments);
  }
  babelHelpers.inherits(TestConstructorAndMethod, _ref4);
  return babelHelpers.createClass(TestConstructorAndMethod);
}(/*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }
  return babelHelpers.createClass(_class4, [{
    key: "method",
    value: function method() {}
  }]);
}());
var TestMultipleMethods = /*#__PURE__*/function (_ref5) {
  "use strict";

  function TestMultipleMethods() {
    babelHelpers.classCallCheck(this, TestMultipleMethods);
    return babelHelpers.callSuper(this, TestMultipleMethods, arguments);
  }
  babelHelpers.inherits(TestMultipleMethods, _ref5);
  return babelHelpers.createClass(TestMultipleMethods);
}(/*#__PURE__*/function () {
  "use strict";

  function _class5() {
    babelHelpers.classCallCheck(this, _class5);
  }
  return babelHelpers.createClass(_class5, [{
    key: "m1",
    value: function m1() {}
  }, {
    key: "m2",
    value: function m2() {}
  }]);
}());
