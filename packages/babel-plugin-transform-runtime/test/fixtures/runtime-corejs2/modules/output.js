"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _Object$keys = require("@babel/runtime-corejs2/core-js/object/keys");
var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
var _bar = _interopRequireDefault(require("bar"));
var _mod = require("mod");
_reexports(exports, _mod);
function _reexports(exports, namespace) {
  _Object$keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (k in exports && exports[k] === namespace[k]) return;
    _defineGetter(exports, k, function () {
      return namespace[k];
    });
  });
}
function _defineGetter(obj, prop, fn) {
  _Object$defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
_bar.default;
