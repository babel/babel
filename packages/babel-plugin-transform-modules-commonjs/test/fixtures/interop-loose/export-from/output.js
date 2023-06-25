"use strict";

exports.__esModule = true;
__exportStar(require("foo"));
function __exportStar(mod) {
  return _reexports(exports, mod);
}
function _reexports(exports, mod) {
  for (const k in mod) {
    if (k === "default" || k === "__esModule") continue;
    k in exports && exports[k] === mod[k] || (exports[k] = mod[k]);
  }
}
