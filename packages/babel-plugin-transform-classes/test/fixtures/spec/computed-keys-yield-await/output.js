async function* fn() {
  var A = /*#__PURE__*/function (_yield$) {
    "use strict";

    function A() {
      babelHelpers.classCallCheck(this, A);
    }
    return babelHelpers.createClass(A, [{
      key: _yield$,
      value: function value() {}
    }]);
  }(yield 1);
  var B = /*#__PURE__*/function (_A, _await$) {
    "use strict";

    function B() {
      babelHelpers.classCallCheck(this, B);
      return babelHelpers.callSuper(this, B, arguments);
    }
    babelHelpers.inherits(B, _A);
    return babelHelpers.createClass(B, [{
      key: _await$,
      value: function value() {}
    }]);
  }(A, await 1);
}
