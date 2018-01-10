(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("my custom module name", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.foo = global.foo || {};
    global.foo.bar = global.foo.bar || {};
    global.foo.bar.baz = global.foo.bar.baz || {};
    global.foo.bar.baz.qux = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = 42;
  _exports.default = _default;
});
