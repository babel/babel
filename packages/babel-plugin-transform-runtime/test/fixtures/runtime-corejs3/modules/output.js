"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js/object/keys");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js/instance/for-each");

var _context;

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

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

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mod[key];
    }
  });
});

const exp = _bar.default + _fuz.baz;
exports.exp = exp;
