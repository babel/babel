"use strict";

0 && (module.exports = { "some exports": _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("some exports", function () {
  return _foo.foo;
});
var _foo = require("foo");
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
