(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("umd/module-name/expected", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.umdModuleNameExpected = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
