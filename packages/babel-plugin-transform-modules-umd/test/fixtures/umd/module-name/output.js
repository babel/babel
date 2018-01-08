(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("umd/module-name/output", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.umdModuleNameOutput = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
