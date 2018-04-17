"use strict";

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _forEachInstanceProperty = require("@babel/runtime/core-js/instance/for-each");

var _context;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;

var _bar = _interopRequireDefault(require("bar"));

var _mod = require("mod");

_forEachInstanceProperty(_context = _Object$keys(_mod)).call(_context, function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _mod[key];
});

_bar.default;
