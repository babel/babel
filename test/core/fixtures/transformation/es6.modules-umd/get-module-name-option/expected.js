(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("my custom module name", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports);
    global.actual = module.exports;
  }
})(this, function (exports) {
  "use strict";
});
