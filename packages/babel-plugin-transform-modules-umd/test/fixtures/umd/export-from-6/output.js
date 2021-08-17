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
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });

  function _exportFromThis(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === this[key]) return;
    var imports = this;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function () {
        return imports[key];
      }
    });
  }

  Object.keys(_foo).forEach(_exportFromThis, _foo);
});
