"use strict";

define(["exports", "./evens"], function (exports, _evens) {
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
