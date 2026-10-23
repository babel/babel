let C = /*#__PURE__*/function () {
  "use strict";

  function C() {}
  var _proto = C.prototype;
  _proto.p = function p() {
    return 1;
  };
  babelHelpers.defineAccessor("get", _proto, "p", function () {
    return 0;
  });
  return C;
}();
