(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("es6.modules-umd/module-name/expected", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.es6ModulesUmdModuleNameExpected = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  foobar();
});