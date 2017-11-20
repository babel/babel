"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.bar = exports.foo = void 0;

var _foo = require("foo");
