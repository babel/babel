(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["a", "b"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("a"), require("b"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.a, global.b);
    global.actual = mod.exports;
  }
})(this, function (_a, _b) {
  "use strict";

  var _a2 = babelHelpers.interopRequireDefault(_a);

  var _b2 = babelHelpers.interopRequireDefault(_b);

  _a2.default;
  _b2.default;
});
