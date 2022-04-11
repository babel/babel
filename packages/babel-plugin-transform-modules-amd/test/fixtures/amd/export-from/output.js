define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.keys(_foo).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === _foo[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function () {
        return _foo[key];
      }
    });
  });
});
