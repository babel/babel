"use strict";

var _indexOfInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/index-of");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
var _exportNames = ["exp"];
exports.exp = void 0;
var _bar = _interopRequireDefault(require("bar"));
var _fuz = require("fuz");
__exportStar(require("mod"));
function __exportStar(mod) {
  return _reexports(exports, mod, _exportNames);
}
function _reexports(exports, mod, exportNames) {
  for (const k in mod) {
    if (k === "default" || k === "__esModule" || _indexOfInstanceProperty(exportNames).call(exportNames, k) >= 0) continue;
    k in exports && exports[k] === mod[k] || (exports[k] = mod[k]);
  }
}
const exp = _bar.default + _fuz.baz;
exports.exp = exp;
