"use strict";

0 && (module.exports = { named1: _, named2: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
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
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
