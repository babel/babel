"use strict";

var _context;

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

var _exportNames = {
  exp: true,
  "default": true,
  __esModule: true
};

function _exportFromThis(key) {
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === this[key]) return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: () => this[key]
  });
}

exports.exp = void 0;

var _bar = _interopRequireDefault(require("bar"));

var _fuz = require("fuz");

var _mod = require("mod");

_forEachInstanceProperty(_context = _Object$keys(_mod)).call(_context, _exportFromThis, _mod);

const exp = _bar.default + _fuz.baz;
exports.exp = exp;
