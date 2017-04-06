(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("my custom module name", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.myCustomModuleName = mod.exports;
  }
})(this, function () {
  "use strict";
});
