"use strict";

var _core2 = require("babel-runtime/es5/core-js");

var _regeneratorRuntime2 = require("babel-runtime/es5/regenerator");

var _interopRequire2 = require("babel-runtime/es5/helpers/interop-require");

var _interopRequireWildcard2 = require("babel-runtime/es5/helpers/interop-require-wildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var giveWord = _regeneratorRuntime2["default"].mark(function giveWord() {
  return _regeneratorRuntime2["default"].wrap(function giveWord$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return myWord;

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, giveWord, this);
});

exports.giveWord = giveWord;

var _foo = require("someModule");

var _foo2 = _interopRequire2["default"](_foo);

var bar = _interopRequireWildcard2["default"](_foo);

var myWord = _core2["default"].Symbol("abc");
exports.myWord = myWord;

_foo2;
bar;
