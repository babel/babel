"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var test = 2;
exports.test = test;
test = exports.test = 5;
test = exports.test += 1;

(function () {
  var test = 2;
  test = 3;
  test++;
})();