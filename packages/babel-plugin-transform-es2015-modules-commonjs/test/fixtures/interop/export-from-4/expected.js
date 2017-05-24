"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function () {
    return _foo.foo;
  }
});
