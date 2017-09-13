(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["babel-template"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("babel-template"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.baz);
    global.actual = mod.exports;
  }
})(this, function (_babelTemplate) {
  "use strict";
});
