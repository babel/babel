(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("mylib/es6.modules-umd/exports-umd-global-root/expected", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global["mylib"] = global["mylib"] || {};
    global["mylib"]["es6.modules-umd/exports-umd-global-root/expected"] = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  myModule();
});
