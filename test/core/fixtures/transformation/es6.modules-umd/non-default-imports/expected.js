(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./lib/render"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./lib/render"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.render);
    global.actual = mod.exports;
  }
})(this, function (exports, _libRender) {
  "use strict";
});
