"use strict";

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./evens"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./evens"));
  }
})(this, function (exports, _evens) {
  exports.nextOdd = nextOdd;
  var isEven = _evens.isEven;

  function nextOdd(n) {
    return (isEven(n) ? n + 1 : n + 2);
  }

  var isOdd = function(isEven) {
    return function(n) {
      return !isEven(n);
    };
  }(isEven);

  exports.isOdd = isOdd;
});
