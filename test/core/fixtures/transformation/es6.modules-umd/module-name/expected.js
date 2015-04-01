(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("es6.modules-umd/module-name/expected", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports);
    global.actual = module.exports;
  }
})(this, function (exports) {
  "use strict";

  foobar();
});
