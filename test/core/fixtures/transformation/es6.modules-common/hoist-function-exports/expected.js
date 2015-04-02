"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextOdd = nextOdd;

var _isEven = require("./evens");

function nextOdd(n) {
  return _isEven.isEven(n) ? n + 1 : n + 2;
}

var isOdd = (function (isEven) {
  return function (n) {
    return !isEven(n);
  };
})(_isEven.isEven);
exports.isOdd = isOdd;
