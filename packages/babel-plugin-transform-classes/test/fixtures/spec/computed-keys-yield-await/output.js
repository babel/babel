async function* fn() {
  var A = /*#__PURE__*/function (_yield$) {
    "use strict";

    function A() {
      babelHelpers.classCallCheck(this, A);
    }

    babelHelpers.createClass(A, [{
      key: _yield$,
      value: function value() {}
    }]);
    return A;
  }(yield 1);

  var B = /*#__PURE__*/function (_A, _await$) {
    "use strict";

    babelHelpers.inherits(B, _A);

    var _super = babelHelpers.createSuper(B);

    function B() {
      babelHelpers.classCallCheck(this, B);
      return _super.apply(this, arguments);
    }

    babelHelpers.createClass(B, [{
      key: _await$,
      value: function value() {}
    }]);
    return B;
  }(A, await 1);
}
