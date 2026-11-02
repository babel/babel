"use strict";

exports.__esModule = true;
var _foo = require("foo");
Object.keys(_foo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foo[key]) return;
  Object.defineProperty(exports, key, {
    configurable: true,
    enumerable: true,
    value: _foo[key],
    writable: true
  });
});
