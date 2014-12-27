System.register("es6-modules-system/hoist-function-exports/expected", ["./evens"], function (_export) {
  "use strict";

  var __moduleName = "es6-modules-system/hoist-function-exports/expected";

  var isEven;
  function nextOdd(n) {
    return isEven(n) ? n + 1 : n + 2;
  }

  var isOdd;
  return {
    setters: [function (m) {
      isEven = m.isEven;
    }],
    execute: function () {
      _export("nextOdd", nextOdd);

      _export("isOdd", isOdd = (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven));
    }
  };
});
