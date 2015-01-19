"use strict";

var _to5Runtime = require("6to5-runtime/helpers");

var _core = require("6to5-runtime/core-js");

var _regeneratorRuntime = require("6to5-runtime/regenerator");

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

var foo = _to5Runtime.interopRequire(require("someModule"));

var bar = _to5Runtime.interopRequireWildcard(require("someModule"));

var myWord = exports.myWord = _core.Symbol("abc");
