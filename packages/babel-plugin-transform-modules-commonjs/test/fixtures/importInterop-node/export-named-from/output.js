"use strict";

0 && (module.exports = { name: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("name", function () {
  return _dep.name;
});
var _dep = require("dep");
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
