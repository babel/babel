"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = [];

var _bar = require("bar");

Object.keys(_bar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (_exportNames.indexOf(key) !== -1) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bar[key];
    }
  });
});

var _foo = require("foo");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anything = {};
