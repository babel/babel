let C = /*#__PURE__*/function () {
  "use strict";

  function C() {
    babelHelpers.classCallCheck(this, C);
  }
  babelHelpers.createClass(C, [{
    key: "a",
    get: /* before get a */
    function () {
      return 42;
    }
    /* after get a */

    /* before set a */,
    set: function (v) {}
    /* after set a */
  }]);
  return C;
}();
