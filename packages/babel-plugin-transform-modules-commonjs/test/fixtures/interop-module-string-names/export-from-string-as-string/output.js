"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: get
  });
}

_export("some exports", function () {
  return _foo["some imports"];
});

var _foo = require("foo");
