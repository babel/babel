"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define("es6-modules-umd/module-name/expected", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  foobar();
});
