"use strict";

0 && (module.exports = { bar: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("bar", function () {
  return _foo.foo;
});
var _foo = require("foo");
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
