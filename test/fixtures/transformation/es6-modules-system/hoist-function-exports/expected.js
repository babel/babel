System.register("actual", ["./evens"], function (_export) {
  "use strict";

  var __moduleName = "actual";

  var isEven;
  function nextOdd(n) {
    return isEven(n) ? n + 1 : n + 2;
  }

  var isOdd = (function (isEven) {
    return function (n) {
      return !isEven(n);
    };
  })(isEven);return {
    setters: [function (m) {
      isEven = m.isEven;
    }],
    execute: function () {
      _export("nextOdd", nextOdd);

      _export("isOdd", isOdd);
    }
  };
});
