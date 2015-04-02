(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.foo);
    global.actual = module.exports;
  }
})(this, function (exports, _foo) {
  "use strict";

  _foo.bar;
  _foo.bar2;
  _foo.baz;
  _foo.bar;
  _foo.bar;
  _foo.xyz;
});
