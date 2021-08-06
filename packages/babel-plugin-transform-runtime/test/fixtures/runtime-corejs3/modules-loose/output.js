"use strict";

var _context;

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

exports.__esModule = true;
var _exportNames = {
  exp: true,
  "default": true,
  __esModule: true
};

function _exportFromThis(key) {
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === this[key]) return;
  exports[key] = this[key];
}

exports.exp = void 0;

var _bar = _interopRequireDefault(require("bar"));

var _fuz = require("fuz");

var _mod = require("mod");

_forEachInstanceProperty(_context = _Object$keys(_mod)).call(_context, _exportFromThis, _mod);

const exp = _bar.default + _fuz.baz;
exports.exp = exp;
