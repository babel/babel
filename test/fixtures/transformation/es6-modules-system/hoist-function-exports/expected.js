System.register(["./evens"], function (_export) {
  var p;

  _export("nextOdd", nextOdd);

  function nextOdd(n) {
    return _export("p", p = isEven(n) ? n + 1 : n + 2);
  }

  var _evens;
  return {
    setters: [function (m) {
      _evens = m
    }],
    execute: function () {
      "use strict";

      var isEven = _evens.isEven;
      _export("p", p = 5);

      var isOdd = _export("isOdd", (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven));
    }
  };
});
