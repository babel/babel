var A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  var _proto = A.prototype;
  _proto.a = function a() {};
  babelHelpers.defineAccessor("get", _proto, "b", function () {});
  _proto.c = function c() {};
  babelHelpers.defineAccessor("set", _proto, "b", function (v) {});
  babelHelpers.defineAccessor("get", A, "d", function () {});
  A.e = function e() {};
  return A;
}();
