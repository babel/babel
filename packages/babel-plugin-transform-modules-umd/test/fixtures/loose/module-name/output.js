(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("loose/module-name/input", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.looseModuleNameInput = mod.exports;
  }
})(this, function () {
  "use strict";

  foobar();
});
