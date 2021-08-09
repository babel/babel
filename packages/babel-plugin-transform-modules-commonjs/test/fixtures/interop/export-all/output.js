"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;
  var imports = this;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return imports[key];
    }
  });
}

exports.default = void 0;

var _react = babelHelpers.interopRequireWildcard(require("react"));

Object.keys(_react).forEach(_exportFromThis, _react);
// The fact that this exports both a normal default, and all of the names via
// re-export is an edge case that is important not to miss. See
// https://github.com/babel/babel/issues/8306 as an example.
var _default2 = _react.default;
exports.default = _default2;
