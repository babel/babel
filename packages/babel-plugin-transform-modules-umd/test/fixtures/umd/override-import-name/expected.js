(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["es6-promise"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("es6-promise"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.Promise);
    global.actual = mod.exports;
  }
})(this, function (_es6Promise) {
  "use strict";
});
