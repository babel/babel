var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  var _proto = A.prototype;
  babelHelpers.defineAccessor("get", _proto, "foo", function () {
    return 1;
  });
  babelHelpers.defineAccessor("set", _proto, "foo", function (v) {});
  return A;
}();
