"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
__exportStar(require("./foo"));
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
