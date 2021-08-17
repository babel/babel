define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });

  function _exportFromThis(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === this[key]) return;
    _exports[key] = this[key];
  }

  Object.keys(_foo).forEach(_exportFromThis, _foo);
});
