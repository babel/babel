"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _foo = require("foo");
_reexports(exports, _foo);
function _reexports(exports, namespace) {
  Object.keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (k in exports && exports[k] === namespace[k]) return;
    exports[k] = namespace[k];
  });
}
