new (/*#__PURE__*/function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }
  return babelHelpers.createClass(_class, [{
    key: "f",
    value: function f() {
      (function () {
        throw new ReferenceError("'delete super.prop' is invalid");
      })();
    }
  }]);
}())().f();
new (/*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  return babelHelpers.createClass(_class2, [{
    key: "f",
    value: function f() {
      babelHelpers.toPropertyKey(0), function () {
        throw new ReferenceError("'delete super[expr]' is invalid");
      }();
    }
  }]);
}())().f();

// [expr] should be evaluated
var counter = 0;
new (/*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  return babelHelpers.createClass(_class3, [{
    key: "f",
    value: function f() {
      babelHelpers.toPropertyKey(++counter), function () {
        throw new ReferenceError("'delete super[expr]' is invalid");
      }();
    }
  }]);
}())().f();

// TypeError before ReferenceError
new (/*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }
  return babelHelpers.createClass(_class4, [{
    key: "f",
    value: function f() {
      babelHelpers.toPropertyKey(0()), function () {
        throw new ReferenceError("'delete super[expr]' is invalid");
      }();
    }
  }]);
}())().f();
