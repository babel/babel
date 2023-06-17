"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = babelHelpers.interopRequireWildcard(require("react"));
_reexports(exports, _react);
function _reexports(exports, namespace) {
  Object.keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (k in exports && exports[k] === namespace[k]) return;
    _defineGetter(exports, k, function () {
      return namespace[k];
    });
  });
}
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
// The fact that this exports both a normal default, and all of the names via
// re-export is an edge case that is important not to miss. See
// https://github.com/babel/babel/issues/8306 as an example.
var _default2 = _react.default;
exports.default = _default2;
