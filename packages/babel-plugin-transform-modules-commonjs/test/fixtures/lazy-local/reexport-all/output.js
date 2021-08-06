"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: () => this[key]
  });
}

var _foo = require("./foo");

Object.keys(_foo).forEach(_exportFromThis, _foo);
