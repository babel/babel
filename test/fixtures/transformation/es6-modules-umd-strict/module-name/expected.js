(function (factory) {
  if (typeof define === "function" && define.amd) {
    define("es6-modules-umd-strict/module-name/expected", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  "use strict";

  foobar();
});
