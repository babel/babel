System.register(["./evens"], function (_export) {
  "use strict";

  var isEven, p, isOdd;
  _export("nextOdd", nextOdd);

  function nextOdd(n) {
    return _export("p", p = isEven(n) ? n + 1 : n + 2);
  }

  return {
    setters: [function (_evens) {
      isEven = _evens.isEven;
    }],
    execute: function () {
      p = _export("p", 5);
      isOdd = _export("isOdd", (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven));
    }
  };
});