"use strict";

var _core = require("babel-runtime/es5/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/es5/regenerator")["default"];

var _interopRequire = require("babel-runtime/es5/helpers/interop-require")["default"];

var _interopRequireWildcard = require("babel-runtime/es5/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var giveWord = _regeneratorRuntime.mark(function giveWord() {
  return _regeneratorRuntime.wrap(function giveWord$(context$1$0) {
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

var foo = _interopRequire(_foo);

var bar = _interopRequireWildcard(_foo);

var myWord = _core.Symbol("abc");
exports.myWord = myWord;

foo;
bar;
