// [Symbol.toPrimitive] must be called if exist
var counter = 0;
new (/*#__PURE__*/function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }
  return babelHelpers.createClass(_class, [{
    key: "f",
    value: function f() {
      babelHelpers.toPropertyKey({
        [Symbol.toPrimitive]: function () {
          ++counter;
          return 0;
        }
      }), function () {
        throw new ReferenceError("'delete super[expr]' is invalid");
      }();
    }
  }]);
}())().f();

// [Symbol.toPrimitive] must return a primitive value
new (/*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  return babelHelpers.createClass(_class2, [{
    key: "f",
    value: function f() {
      babelHelpers.toPropertyKey({
        [Symbol.toPrimitive]: function () {
          return {};
        }
      }), function () {
        throw new ReferenceError("'delete super[expr]' is invalid");
      }();
    }
  }]);
}())().f();
