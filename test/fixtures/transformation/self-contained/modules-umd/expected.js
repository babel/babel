(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "6to5-runtime/helpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("6to5-runtime/helpers"));
  }
})(function (exports, _foo, _to5RuntimeHelpers) {
  "use strict";

  var _to5Helpers = _to5RuntimeHelpers["default"];
  var foo = _to5Helpers.interopRequire(_foo);
});
