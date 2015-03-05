"use strict";

var Test = (function () {
  function Test() {
    babelHelpers.classCallCheck(this, Test);
  }

  babelHelpers.createClass(Test, {
    test: {
      get: function () {
        return 5 + 5;
      }
    }
  });
  return Test;
})();