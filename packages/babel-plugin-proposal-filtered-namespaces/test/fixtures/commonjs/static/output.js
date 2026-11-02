"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.re = void 0;
var _x = require("x");
var _y = require("y");
const ns = Object.freeze(Object.defineProperty({
    __proto__: null,
    get a() {
      return _x.a;
    },
    get b() {
      return _x.b;
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  _re = exports.re = Object.freeze(Object.defineProperty({
    __proto__: null,
    get c() {
      return _y.c;
    }
  }, Symbol.toStringTag, {
    value: "Module"
  }));
console.log(ns);
