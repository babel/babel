(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.foo);
    global.input = mod.exports;
  }
})(this, function (_foo) {
  "use strict";

  _foo.bar;
  _foo.bar2;
  _foo.baz;
  _foo.bar;
  _foo.bar;
  _foo.xyz;
});
