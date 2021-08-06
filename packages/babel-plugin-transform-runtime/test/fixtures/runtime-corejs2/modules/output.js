"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _Object$keys = require("@babel/runtime-corejs2/core-js/object/keys");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: () => this[key]
  });
}

var _bar = _interopRequireDefault(require("bar"));

var _mod = require("mod");

_Object$keys(_mod).forEach(_exportFromThis, _mod);

_bar.default;
