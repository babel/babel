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

_export("foo", function () {
  return _foo.foo;
});

_export("bar", function () {
  return _foo.bar;
});

var _foo = require("foo");
