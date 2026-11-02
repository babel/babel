var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  babelHelpers.defineAccessor("get", A, "foo", function () {
    return 1;
  });
  babelHelpers.defineAccessor("set", A, "foo", function (v) {});
  return A;
}();
