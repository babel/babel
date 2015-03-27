"use strict";

exports.nextOdd = nextOdd;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var isEven = require("./evens").isEven;

function nextOdd(n) {
  return isEven(n) ? n + 1 : n + 2;
}

var isOdd = (function (isEven) {
  return function (n) {
    return !isEven(n);
  };
})(isEven);
exports.isOdd = isOdd;