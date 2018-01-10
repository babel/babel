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

  _exports.__esModule = true;
  Object.keys(_foo).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    _exports[key] = _foo[key];
  });
});
