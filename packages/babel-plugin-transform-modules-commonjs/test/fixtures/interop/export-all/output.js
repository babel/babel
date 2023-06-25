"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
_interop = 1;
__exportStar(require("react"));
var _react = _lastRequired;
var _lastRequired, _interop;
function __exportStar(mod) {
  return _reexports(exports, _lastRequired = _interop == 1 ? babelHelpers.interopRequireWildcard(mod) : mod);
}
function _reexports(exports, mod) {
  for (const k in mod) {
    if (k === "default" || k === "__esModule") continue;
    k in exports && exports[k] === mod[k] || Object.defineProperty(exports, k, {
      get: function () {
        return mod[k];
      },
      enumerable: true
    });
  }
}
// The fact that this exports both a normal default, and all of the names via
// re-export is an edge case that is important not to miss. See
// https://github.com/babel/babel/issues/8306 as an example.
var _default2 = _react.default;
exports.default = _default2;
