"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _bar = _interopRequireDefault(require("bar"));
__exportStar(require("mod"));
function __exportStar(mod) {
  return _reexports(exports, mod);
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
_bar.default;
