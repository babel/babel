"use strict";

exports.__esModule = true;

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;
  exports[key] = this[key];
}

var _foo = require("foo");

Object.keys(_foo).forEach(_exportFromThis, _foo);
