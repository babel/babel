System.register(["./evens"], function (_export) {
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
      "use strict";

      p = 5;

      _export("p", p);

      isOdd = (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven);

      _export("isOdd", isOdd);
    }
  };
});