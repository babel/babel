(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("loose/module-name/output", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.looseModuleNameOutput = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
