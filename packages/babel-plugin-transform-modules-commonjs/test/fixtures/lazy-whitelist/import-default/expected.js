"use strict";

var _white = babelHelpers.interopRequireDefault(require("white"));

function _black() {
  const data = babelHelpers.interopRequireDefault(require("black"));

  _black = function () {
    return data;
  };

  return data;
}

console.log(_white.default);
console.log(_black().default);
