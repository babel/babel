(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("umd/module-name/input", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.umdModuleNameInput = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
