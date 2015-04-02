(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./evens"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./evens"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.evens);
    global.actual = module.exports;
  }
})(this, function (exports, _evens) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nextOdd = nextOdd;

  function nextOdd(n) {
    return _evens.isEven(n) ? n + 1 : n + 2;
  }

  var isOdd = (function (isEven) {
    return function (n) {
      return !isEven(n);
    };
  })(_evens.isEven);
  exports.isOdd = isOdd;
});
