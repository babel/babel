"use strict";

var _context;

var _forEachInstanceProperty = require("core-js-pure/stable/instance/for-each.js");

var _Object$keys = require("core-js-pure/stable/object/keys.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

exports.__esModule = true;
var _exportNames = {
  exp: true
};
exports.exp = void 0;

var _bar = _interopRequireDefault(require("bar"));

var _fuz = require("fuz");

var _mod = require("mod");

_forEachInstanceProperty(_context = _Object$keys(_mod)).call(_context, function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _mod[key];
});

const exp = _bar.default + _fuz.baz;
exports.exp = exp;
