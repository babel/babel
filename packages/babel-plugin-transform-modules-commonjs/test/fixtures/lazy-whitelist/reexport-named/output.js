"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: get
  });
}

_export("named1", function () {
  return _white().named1;
});

_export("named2", function () {
  return _black.named2;
});

function _white() {
  const data = require("white");

  _white = function () {
    return data;
  };

  return data;
}

var _black = require("black");
