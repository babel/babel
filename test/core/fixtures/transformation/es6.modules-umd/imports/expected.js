(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.foo, global.fooBar, global.directoryFooBar);
    global.actual = module.exports;
  }
})(this, function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict";
});
