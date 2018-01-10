"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _white = require("white");

Object.keys(_white).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _white[key];
    }
  });
});

var _black = require("black");

Object.keys(_black).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _black[key];
    }
  });
});
