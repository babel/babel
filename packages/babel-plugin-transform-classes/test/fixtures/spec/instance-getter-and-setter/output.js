var Test =
/*#__PURE__*/
function () {
  "use strict";

  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    get: function get() {
      return 5 + 5;
    },
    set: function set(val) {
      this._test = val;
    }
  }]);
  return Test;
}();
