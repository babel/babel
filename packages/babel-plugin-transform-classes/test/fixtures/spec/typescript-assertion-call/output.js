var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  return babelHelpers.createClass(A, [{
    key: "m",
    value: function m() {
      return this;
    }
  }], [{
    key: "s",
    value: function s() {
      return this;
    }
  }]);
}();
var B = /*#__PURE__*/function (_A) {
  "use strict";

  function B() {
    babelHelpers.classCallCheck(this, B);
    return babelHelpers.callSuper(this, B, arguments);
  }
  babelHelpers.inherits(B, _A);
  return babelHelpers.createClass(B, [{
    key: "as",
    value: function as() {
      return babelHelpers.superPropGet(B, "m", this, 3)([]);
    }
  }, {
    key: "nonNull",
    value: function nonNull() {
      return babelHelpers.superPropGet(B, "m", this, 3)([]);
    }
  }], [{
    key: "as",
    value: function as() {
      return babelHelpers.superPropGet(B, "s", this, 2)([]);
    }
  }]);
}(A);
