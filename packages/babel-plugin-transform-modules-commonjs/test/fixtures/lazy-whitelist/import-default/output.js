"use strict";

function _black() {
  const data = babelHelpers.interopRequireDefault(require("black"));

  _black = function () {
    return data;
  };

  return data;
}

function _white() {
  const data = babelHelpers.interopRequireDefault(require("white"));

  _white = function () {
    return data;
  };

  return data;
}

console.log(_white().default);
console.log(_black().default);
