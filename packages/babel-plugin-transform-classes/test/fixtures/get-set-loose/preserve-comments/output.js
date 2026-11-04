let C = /*#__PURE__*/function () {
  "use strict";

  function C() {}
  var _proto = C.prototype;
  /* before get a */
  babelHelpers.defineAccessor("get", _proto, "a", function () {
    return 42;
  }
  /* after get a */

  /* before set a */);
  babelHelpers.defineAccessor("set", _proto, "a", function (v) {}
  /* after set a */);
  return C;
}();
