"use strict";

var _white = require("white");

function _black() {
  const data = require("black");

  _black = function () {
    return data;
  };

  return data;
}

console.log(_white.foo1);
console.log(_black().foo2);
