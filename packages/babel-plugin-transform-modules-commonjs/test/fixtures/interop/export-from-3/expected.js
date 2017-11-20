"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = exports.foo = void 0;
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

var _foo = require("foo");
