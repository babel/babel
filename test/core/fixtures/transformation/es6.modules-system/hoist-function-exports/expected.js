System.register(["./evens"], function (_export) {
  "use strict";

  var isEven, p, a, i, j, isOdd;

  _export("nextOdd", nextOdd);

  function nextOdd(n) {
    return _export("p", p = isEven(n) ? n + 1 : n + 2);
  }

  return {
    setters: [function (_evens) {
      isEven = _evens.isEven;
    }],
    execute: function () {
      p = 5;

      _export("p", p);

      for (a in b);

      for (i = 0, j = 0;;);

      isOdd = (function (isEven) {
        return function (n) {
          return !isEven(n);
        };
      })(isEven);

      _export("isOdd", isOdd);
    }
  };
});
