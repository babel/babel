define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {};
  Object.keys(_foo).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _foo[key];
      }
    });
  });
});
