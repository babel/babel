"use strict";

0 && (module.exports = { named: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("named", function () {
  return _foo.named;
});
var _foo = require("./foo");
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
