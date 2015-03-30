"use strict";

var Test = (function () {
  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    set: function (val) {
      this._test = val;
    }
  }]);
  return Test;
})();
