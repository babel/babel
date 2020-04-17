"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bar = _interopRequireDefault(require("bar"));

var _mod = require("mod");

Object.keys(_mod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mod[key];
    }
  });
});
_bar.default;
