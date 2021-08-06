"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get
  });
}

_export("named1", () => _white().named1);

_export("named2", () => _black.named2);

function _white() {
  const data = require("white");

  _white = function () {
    return data;
  };

  return data;
}

var _black = require("black");
