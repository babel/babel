(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["a"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("a"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.a);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_a) {
  "use strict";

  _a = _interopRequireDefault(_a);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});
