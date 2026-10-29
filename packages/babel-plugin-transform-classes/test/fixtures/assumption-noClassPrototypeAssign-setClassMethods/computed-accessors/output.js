var A = /*#__PURE__*/function (_foo) {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  var _proto = A.prototype;
  babelHelpers.defineAccessor("get", _proto, _foo, function () {});
  babelHelpers.defineAccessor("set", _proto, "bar", function (v) {});
  babelHelpers.defineAccessor("get", _proto, 1, function () {});
  babelHelpers.defineAccessor("set", A, Symbol.iterator, function (v) {});
  return A;
}(foo);
