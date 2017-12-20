"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => new Promise(function ($return, $error) {
  return Promise.resolve(foo()).then($return, $error);
});

exports.default = _default;
