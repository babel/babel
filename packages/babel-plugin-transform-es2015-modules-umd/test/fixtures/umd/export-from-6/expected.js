(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo);
    global.actual = mod.exports;
  }
})(this, function (exports, _foo) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {};
  Object.keys(_foo).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _foo[key];
      }
    });
  });
});
