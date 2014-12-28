System.register(["./evens"], function (_export) {
  _export("nextOdd", nextOdd);

  function nextOdd(n) {
    return isEven(n) ? n + 1 : n + 2;
  }

  var _evens;
  return {
    setters: [function (m) {
      _evens = m
    }],
    execute: function () {
      "use strict";

      var isEven = _evens.isEven;
      var isOdd = _export("isOdd", (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven));
    }
  };
});
