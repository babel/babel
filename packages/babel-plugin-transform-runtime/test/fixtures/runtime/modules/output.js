"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: () => this[key]
  });
}

var _bar = _interopRequireDefault(require("bar"));

var _mod = require("mod");

Object.keys(_mod).forEach(_exportFromThis, _mod);
_bar.default;
