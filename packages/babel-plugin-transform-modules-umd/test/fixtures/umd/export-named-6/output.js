(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./input.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./input.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.input);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _input) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.a = Object.defineProperty(_exports, "__proto__", {
    enumerable: true,
    value: void 0,
    writable: true
  })["__proto__"] = _exports._ = void 0;
  const __proto__ = _exports.__proto__ = null;
  const a = _exports.a = 1;
  const _ = _exports._ = 2;
  console.log(_input.__proto__);
});
