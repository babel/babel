var A = /*#__PURE__*/function (_B) {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
    return babelHelpers.callSuper(this, A, arguments);
  }
  babelHelpers.inheritsLoose(A, _B);
  var _proto = A.prototype;
  babelHelpers.defineAccessor("get", _proto, "foo", function () {
    return babelHelpers.superPropGet(A, "foo", this, 1);
  });
  _proto.bar = function bar() {};
  return A;
}(B);
