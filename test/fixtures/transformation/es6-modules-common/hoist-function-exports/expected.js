"use strict";

exports.nextOdd = nextOdd;
var isEven = require("./evens").isEven;
function nextOdd(n) {
  return isEven(n) ? n + 1 : n + 2;
}

var isOdd = exports.isOdd = (function (isEven) {
  return function (n) {
    return !isEven(n);
  };
})(isEven);