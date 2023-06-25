"use strict";

0 && (module.exports = { named: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("named", function () {
  return _foo().named;
});
function _foo() {
  const data = require("foo");
  _foo = function () {
    return data;
  };
  return data;
}
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
