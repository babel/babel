"use strict";

0 && (module.exports = { default: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("default", function () {
  return _foo.default;
});
var _foo = require("foo");
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
