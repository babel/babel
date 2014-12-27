(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  "use strict";

  var test = exports.test = 2;
  test = 5;

  (function () {
    var test = 2;
    test = 3;
  })();
});
