(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./evens"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./evens"));
  }
})(function (exports, _evens) {
  "use strict";

  exports.nextOdd = nextOdd;
  var isEven = _evens.isEven;
  function nextOdd(n) {
    return isEven(n) ? n + 1 : n + 2;
  }

  var isOdd = exports.isOdd = (function (isEven) {
    return function (n) {
      return !isEven(n);
    };
  })(isEven);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});