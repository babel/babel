"use strict";

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _indexOfInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/index-of");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
exports.__esModule = true;
var _exportNames = ["exp"];
exports.exp = void 0;
var _bar = _interopRequireDefault(require("bar"));
var _fuz = require("fuz");
var _mod = require("mod");
_reexports(exports, _mod, _exportNames);
function _reexports(exports, namespace, exportNames) {
  var _context;
  _forEachInstanceProperty(_context = _Object$keys(namespace)).call(_context, function (k) {
    if (k === "default" || k === "__esModule") return;
    if (_indexOfInstanceProperty(exportNames).call(exportNames, k) >= 0) return;
    if (k in exports && exports[k] === namespace[k]) return;
    exports[k] = namespace[k];
  });
}
const exp = _bar.default + _fuz.baz;
exports.exp = exp;
