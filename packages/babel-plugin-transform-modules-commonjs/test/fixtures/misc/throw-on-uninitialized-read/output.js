"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

var _x_storage,
    _x_set = false;

Object.defineProperty(exports, "x", {
  get: function () {
    if (_x_set === false) {
      throw new Error("Cannot access uninitialized export x");
    }

    return _x_storage;
  },
  set: function (_v) {
    if (_x_set) {
      throw new Error("Cannot reassign exported value x");
    }

    _x_set = true;
    _x_storage = _v;
  },
  enumerable: true
});

var _y_storage,
    _y_set = false;

Object.defineProperty(exports, "y", {
  get: function () {
    if (_y_set === false) {
      throw new Error("Cannot access uninitialized export y");
    }

    return _y_storage;
  },
  set: function (_v) {
    if (_y_set) {
      throw new Error("Cannot reassign exported value y");
    }

    _y_set = true;
    _y_storage = _v;
  },
  enumerable: true
});

const foo = require('foo');

const x = "Hello world";
exports.x = x;

function bar() {
  return 42;
}

const y = "Goodbye world";
exports.y = y;
