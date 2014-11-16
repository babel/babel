(function (factory) {
  if (typeof define === "function" && define.amd) {
    define("modules-umd/imports/expected", ["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  }
})(function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict";
});