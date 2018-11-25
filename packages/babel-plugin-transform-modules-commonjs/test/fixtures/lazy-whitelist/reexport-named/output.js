"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "named1", {
  enumerable: true,
  get: function () {
    return _white.named1;
  }
});
Object.defineProperty(exports, "named2", {
  enumerable: true,
  get: function () {
    return _black().named2;
  }
});

var _white = require("white");

function _black() {
  const data = require("black");

  _black = function () {
    return data;
  };

  return data;
}
