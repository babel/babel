"use strict";

var Test = (function () {
  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }

  babelHelpers.createClass(Test, {
    test: {
      value: function test() {
        return 5 + 5;
      }
    }
  });
  return Test;
})();