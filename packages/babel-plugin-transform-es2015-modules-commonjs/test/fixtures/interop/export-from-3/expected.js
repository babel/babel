"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function () {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function () {
    return _foo.bar;
  }
});
