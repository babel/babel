"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

_core.Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.giveWord = giveWord;
var marked0$0 = [giveWord].map(_regeneratorRuntime.mark);

var _foo = require("someModule");

var _foo2 = _interopRequireWildcard(_foo);

var bar = _interopRequireWildcard(_foo);

var myWord = _core.Symbol("abc");
exports.myWord = myWord;

function giveWord() {
  return _regeneratorRuntime.wrap(function giveWord$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return myWord;

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

_foo2["default"];
bar;