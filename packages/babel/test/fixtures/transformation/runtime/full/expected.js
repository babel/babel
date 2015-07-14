"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.giveWord = giveWord;
var marked0$0 = [giveWord].map(_regeneratorRuntime.mark);

var _someModule = require("someModule");

var _someModule2 = _interopRequireDefault(_someModule);

var bar = _interopRequireWildcard(_someModule);

var myWord = _Symbol("abc");
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

_someModule2["default"];
bar;
