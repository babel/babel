(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("loose/module-name/expected", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.looseModuleNameExpected = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
