(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("MyLib", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.MyLib = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  foobar();
});