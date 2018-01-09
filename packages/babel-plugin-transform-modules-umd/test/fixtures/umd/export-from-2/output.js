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
})(this, function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
});
