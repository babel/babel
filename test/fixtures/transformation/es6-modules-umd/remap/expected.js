(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  "use strict";

  var test = exports.test = 2;
  test = exports.test = 5;
  test = exports.test += 1;

  (function () {
    var test = 2;
    test = 3;
    test++;
  })();
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});