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

  var bar = _foo.bar;
  var bar2 = _foo.bar2;
  var baz = _foo.baz;
  var baz2 = _foo.bar;
  var baz3 = _foo.bar;
  var xyz = _foo.xyz;
});
